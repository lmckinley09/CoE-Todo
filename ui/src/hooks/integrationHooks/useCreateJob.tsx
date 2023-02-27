import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';

interface ICreateJob {
	title: string;
	description: string;
	completionDate: string;
	status: string;
	typeId: number;
}

export const createJob = async (boardId: number, jobDetails: ICreateJob) => {
	const response = await axiosInstance.post(
		`/jobs?boardId=${boardId}`,
		jobDetails
	);
	return response;
};

const useCreateJob = (boardId: number) =>
	useMutation((createNewJob: ICreateJob) => createJob(boardId, createNewJob));

export default useCreateJob;
