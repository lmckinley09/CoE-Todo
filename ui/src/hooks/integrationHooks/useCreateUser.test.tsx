import { renderHook, act } from '@testing-library/react-hooks';
import useCreateUser, { ICreateUser } from './useCreateUser';
import { axiosInstance } from '@integrations/instance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';

jest.mock('../../integrations/Instance', () => ({
	axiosInstance: {
		post: jest.fn(),
	},
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('useCreateUser', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call useCreateUser and return data when called', async () => {
		const user: ICreateUser = {
			firstName: 'fname',
			lastName: 'lname',
			email: 'email@email.com',
			password: 'password1!',
		};

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateUser(), {
			wrapper,
		});
		act(() => result.current.mutate(user));
		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', user);
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.variables).toEqual(user);
		});
	});
});
