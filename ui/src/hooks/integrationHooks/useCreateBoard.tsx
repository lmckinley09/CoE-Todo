import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { ICreateBoard } from '@interfaces/boards';

export const createBoard = async (boardDetails: ICreateBoard) => {
	const response = await axiosInstance.post(`/boards`, boardDetails);
	return response;
};

const useCreateJob = () =>
	useMutation((newBoard: ICreateBoard) => createBoard(newBoard));

export default useCreateJob;
