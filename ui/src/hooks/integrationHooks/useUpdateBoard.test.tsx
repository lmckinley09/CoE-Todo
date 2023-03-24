import { renderHook, act } from '@testing-library/react-hooks';
import useUpdateBoard from './useUpdateBoard';
import { axiosInstance } from '@integrations/instance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { IUpdateBoard } from '@interfaces/boards';

jest.mock('../../integrations/Instance', () => ({
	axiosInstance: {
		put: jest.fn(),
	},
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('useUpdateBoard', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call useUpdateBoard and return data when called', async () => {
		const board: IUpdateBoard = {
			name: 'new',
		};

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useUpdateBoard(1), {
			wrapper,
		});
		act(() => result.current.mutate(board));
		await waitFor(() => {
			expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.put).toHaveBeenCalledWith('/boards/1', board);
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.variables).toEqual(board);
		});
	});
});
