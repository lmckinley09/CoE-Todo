import { useQuery, UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@integrations/instance';
import { IJob } from '@interfaces/jobs';

export const getJobs = async (boardId: number) => {
	const response = await axiosInstance.get(`/jobs?boardId=${boardId}`);
	return response;
};

const useGetJobs = (boardId: number): UseQueryResult<AxiosResponse<IJob[]>> =>
	useQuery(['jobs'], () => getJobs(boardId));

export default useGetJobs;
