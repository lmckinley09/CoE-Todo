import { renderHook, act } from '@testing-library/react-hooks';
import useCreateJob from './useCreateJob';
import { axiosInstance } from '@integrations/instance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';
import { IJob } from '@interfaces/jobs';

jest.mock('../../integrations/Instance', () => ({
	axiosInstance: {
		post: jest.fn(),
	},
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('useCreateJob', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call useCreateJob and return data when called', async () => {
		const job: IJob = {
			id: 1,
			boardId: 1,
			typeId: 1,
			title: 'test',
			description: '<p>test</p>',
			status: 'Not Started',
			completionDate: '2023-02-27T00:00:00.000Z',
			lastModified: '2023-03-02T10:53:23.663Z',
			created: '2023-02-27T18:33:18.476Z',
			jobType: { id: 1, description: 'tick' },
		};

		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateJob(1), {
			wrapper,
		});
		act(() => result.current.mutate(job));
		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith('/jobs?boardId=1', job);
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.variables).toEqual(job);
		});
	});
});
