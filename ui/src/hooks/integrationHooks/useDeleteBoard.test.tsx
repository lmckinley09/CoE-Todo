import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import useDeleteBoard, { deleteBoard } from './useDeleteBoard';
import { axiosInstance } from '@integrations/instance';
import { waitFor } from '@testing-library/react';

jest.mock('../../integrations/Instance');

describe('useDeleteBoard', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const boardToDelete = 1;
	beforeEach(() => {
		(axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 204 });
	});

	it('should call the useDeleteBoard function with the correct arguments', async () => {
		await deleteBoard(boardToDelete);
		expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
		expect(axiosInstance.delete).toHaveBeenCalledWith(`/boards/${boardToDelete}`);
	});

	it('should return a mutation result object with the correct types', () => {
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useDeleteBoard(), { wrapper });

		expect(result.current.isLoading).toBeFalsy();
		expect(result.current.isIdle).toBeTruthy();
		expect(result.current.isSuccess).toBeFalsy();
		expect(result.current.isError).toBeFalsy();
		expect(result.current.mutate).toBeDefined();
	});

	it('should call the deleteBoard function when the mutate function is called', async () => {
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useDeleteBoard(), { wrapper });

		result.current.mutate(boardToDelete);
		await waitFor(() => {
			expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
			expect(axiosInstance.delete).toHaveBeenCalledWith(
				`/boards/${boardToDelete}`
			);
		});
	});
});
