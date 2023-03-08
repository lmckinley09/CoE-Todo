import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IUpdateBoard } from '@interfaces/boards';

export const updateBoard = async (
	boardId: number,
	boardDetails: IUpdateBoard
) => {
	const response = await axiosInstance.put(`/boards/${boardId}`, boardDetails);
	return response;
};

const useUpdateBoard = (boardId: number) =>
	useMutation((updatedBoard: IUpdateBoard) =>
		updateBoard(boardId, updatedBoard)
	);

export default useUpdateBoard;
