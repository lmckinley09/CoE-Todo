import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IGetJobs } from '@interfaces/jobs';

export const getJobs = async (boardId: number) => {
	const response = await axiosInstance.get(`/jobs?boardId=${boardId}`);
	return response;
};

const useGetJobs = (boardId: number): UseQueryResult<IGetJobs> =>
	useQuery(['jobs'], () => getJobs(boardId));

export default useGetJobs;
