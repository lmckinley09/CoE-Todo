import { renderHook } from '@testing-library/react-hooks';
import useGetBoards from './useGetBoards';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('useGetBoards', () => {
	it('should fetch boards data', async () => {
		const queryClient = new QueryClient();

		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result, waitFor } = renderHook(() => useGetBoards(), {
			wrapper,
		});

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => result.current.isSuccess);

		expect(result.current.isLoading).toBe(false);

		expect(result.current.data).toBeDefined();
	});
});
