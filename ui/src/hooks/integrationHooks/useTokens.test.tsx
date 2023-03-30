import { renderHook } from '@testing-library/react-hooks';
import useTokens from './useTokens';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuthState } from '../../stores/useAuthState';

const mockedUsedNavigate = jest.fn();
const mockedSetAuthorized = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUsedNavigate,
}));

jest.mock('jwt-decode', () => () => ({ exp: '1516238022' }));

jest.mock('../../stores/useAuthState.tsx');
describe('useTokens', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		localStorage.clear();
	});

	it('should check localStorage tokens and set authorized state to true if valid', async () => {
		const mockUseAuthState = useAuthState as jest.MockedFunction<
			typeof useAuthState
		>;
		mockUseAuthState.mockReturnValue({
			isAuthorized: true,
			setIsAuthorized: mockedSetAuthorized,
		});

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useTokens(), {
			wrapper,
		});
		const tokens = {
			accessToken: 'valid access token',
			refreshToken: 'valid refresh token',
		};
		localStorage.setItem('accessToken', tokens.accessToken);
		localStorage.setItem('refreshToken', tokens.refreshToken);

		result.current.checkLocalStorageTokens();

		expect(mockedSetAuthorized).toHaveBeenCalled();
	});
});
