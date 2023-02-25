import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '@integrations/instance';

export interface IBoard {
	id: number;
	name: string;
	created: string;
	last_modified: string;
}

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
