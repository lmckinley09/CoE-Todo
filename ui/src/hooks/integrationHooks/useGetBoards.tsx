import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IBoard } from '@interfaces/boards';

interface IBoards {
	data?: Array<IBoard>;
}

export const getBoards = async () => {
	const response = await axiosInstance.get('/boards');
	return response;
};

const useGetBoards = (): UseQueryResult<IBoards> =>
	useQuery(['boards'], () => getBoards());

export default useGetBoards;
