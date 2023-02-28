import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IGetBoards } from '@interfaces/boards';
import { AxiosResponse } from 'axios';

// interface IGetBoards {
// 	data?: Array<IBoard>;
// }

export const getBoards = async () => {
	const response = await axiosInstance.get('/boards');
	return response;
};

const useGetBoards = (): UseQueryResult<AxiosResponse<IGetBoards>> =>
	useQuery(['boards'], () => getBoards());

export default useGetBoards;
