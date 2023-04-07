import { renderHook, act } from '@testing-library/react-hooks';
import useUpdateJob from './useUpdateJob';
import { axiosInstance } from '@integrations/instance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { IUpdateJob } from '@interfaces/jobs';

jest.mock('../../integrations/instance', () => ({
	axiosInstance: {
		put: jest.fn(),
	},
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('useUpdateJob', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call useUpdateJob and return data when called', async () => {
		const job: IUpdateJob = {
			title: 'test',
			description: 'desc',
			completionDate: '2023-02-27T00:00:00.000Z',
			status: 'Done',
			typeId: 1,
		};

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useUpdateJob(1), {
			wrapper,
		});
		act(() => result.current.mutate(job));
		await waitFor(() => {
			expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.put).toHaveBeenCalledWith('/jobs/1', job);
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.variables).toEqual(job);
		});
	});
});
