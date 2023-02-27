import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';
import { IUpdateJob } from '@interfaces/jobs';

export const updateJob = async (jobId: number, jobDetails: IUpdateJob) => {
	const response = await axiosInstance.put(`/jobs/${jobId}`, jobDetails);
	return response;
};

const useUpdateJob = (jobId: number) =>
	useMutation((updatedJob: IUpdateJob) => updateJob(jobId, updatedJob));

export default useUpdateJob;
