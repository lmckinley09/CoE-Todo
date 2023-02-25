import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IBoard } from '@interfaces/boards';

interface IGetBoard {
	data?: IBoard;
}

export const getBoard = async (boardId: number) => {
	const response = await axiosInstance.get(`/boards/${boardId}`);
	return response;
};

const useGetBoard = (boardId: number): UseQueryResult<IGetBoard> =>
	useQuery(['board'], () => getBoard(boardId));

export default useGetBoard;
