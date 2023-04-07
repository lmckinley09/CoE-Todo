import { renderHook, act } from '@testing-library/react-hooks';
import useCreateBoard from './useCreateBoard';
import { axiosInstance } from '@integrations/instance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { ICreateBoard } from '@interfaces/boards';

jest.mock('../../integrations/instance', () => ({
	axiosInstance: {
		post: jest.fn(),
	},
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('useCreateBoard', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call useCreateBoard and return data when called', async () => {
		const board: ICreateBoard = {
			name: 'test',
			users: [],
		};

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateBoard(), {
			wrapper,
		});
		act(() => result.current.mutate(board));
		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith('/boards', board);
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.variables).toEqual(board);
		});
	});
});
