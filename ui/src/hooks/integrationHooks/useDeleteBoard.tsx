import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';

export const deleteBoard = async (boardId: number) => {
	const response = await axiosInstance.delete(`/boards/${boardId}`);
	return response;
};

const useDeleteBoard = () =>
	useMutation((boardId: number) => deleteBoard(boardId));

export default useDeleteBoard;
