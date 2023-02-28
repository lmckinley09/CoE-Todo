import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';

interface ICreateBoard {
	name: string;
	users: Array<string>;
}

export const createBoard = async (boardDetails: ICreateBoard) => {
	const response = await axiosInstance.post(`/boards`, boardDetails);
	return response;
};

const useCreateJob = () =>
	useMutation((newBoard: ICreateBoard) => createBoard(newBoard));

export default useCreateJob;
