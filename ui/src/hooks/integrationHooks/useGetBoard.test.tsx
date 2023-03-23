import { renderHook } from '@testing-library/react-hooks';
import useGetBoard from './useGetBoard';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('useGetBoard', () => {
	it('should fetch board data', async () => {
		const queryClient = new QueryClient();

		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result, waitFor } = renderHook(() => useGetBoard(1), {
			wrapper,
		});

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => result.current.isSuccess);

		expect(result.current.isLoading).toBe(false);

		expect(result.current.data).toBeDefined();
	});
});
