import { useQuery, UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@integrations/instance';
import { IBoard } from '@interfaces/boards';

export const getBoard = async (boardId: number) => {
	const response = await axiosInstance.get(`/boards/${boardId}`);
	return response;
};

const useGetBoard = (boardId: number): UseQueryResult<AxiosResponse<IBoard>> =>
	useQuery(['board'], () => getBoard(boardId));

export default useGetBoard;
