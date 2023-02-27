import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';

interface IUpdateJob {
	title: string;
	description: string;
	completionDate: string;
	status: string;
	typeId: number;
}

export const updateJob = async (jobId: number, jobDetails: IUpdateJob) => {
	const response = await axiosInstance.put(`/jobs/${jobId}`, jobDetails);
	return response;
};

const useUpdateJob = (jobId: number) =>
	useMutation((updatedJob: IUpdateJob) => updateJob(jobId, updatedJob));

export default useUpdateJob;
