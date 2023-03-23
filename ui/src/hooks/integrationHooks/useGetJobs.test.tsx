import { renderHook } from '@testing-library/react-hooks';
import useGetJobs from './useGetJobs';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('useGetBoards', () => {
	it('should fetch jobs data', async () => {
		const queryClient = new QueryClient();

		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result, waitFor } = renderHook(() => useGetJobs(1), {
			wrapper,
		});

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => result.current.isSuccess);

		expect(result.current.isLoading).toBe(false);

		expect(result.current.data).toBeDefined();
	});
});
