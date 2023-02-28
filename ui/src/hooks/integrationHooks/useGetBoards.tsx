import { useQuery, UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@integrations/instance';
import { IGetBoards } from '@interfaces/boards';

export const getBoards = async () => {
	const response = await axiosInstance.get('/boards');
	return response;
};

const useGetBoards = (): UseQueryResult<AxiosResponse<IGetBoards>> =>
	useQuery(['boards'], () => getBoards());

export default useGetBoards;
