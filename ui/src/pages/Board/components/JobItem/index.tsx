import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { JobBox } from './styled';
import { IJobItem, IUpdateJob } from '@interfaces/jobs';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import useUpdateJob from '@hooks/integrationHooks/useUpdateJob';
import { StatusCodes } from 'http-status-codes';

const JobItem = (props: IJobItem) => {
	const { job } = props;
	const { mutate } = useUpdateJob(job.id);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const isDone = job.status === 'Done';

	const handleCheckboxChange = () => {
		const status = job.status === 'Done' ? 'Not Started' : 'Done';

		const updatedJob: IUpdateJob = {
			title: job.title,
			description: job.description,
			status: status,
			completionDate: job.completionDate,
			typeId: job.typeId,
		};
		mutate(updatedJob, {
			onSuccess: async (response) => {
				await queryClient.refetchQueries(['jobs']);
			},
			onError: (error: any) => {
				if (error.response.status === StatusCodes.UNAUTHORIZED) {
					navigate('/login');
				}
			},
		});
	};

	return (
		<JobBox>
			<Grid container spacing={1}>
				<Grid item>
					<Checkbox
						data-testid={`job-status-checkbox-${job.jobType.description}-${job.id}`}
						color="secondary"
						checked={isDone}
						onChange={handleCheckboxChange}
					/>
				</Grid>
				<Grid item>
					<Box
						data-testid={`job-${job.jobType.description}-${job.id}`}
						onClick={() => props.openEditModal(job)}
					>
						<Typography>{job.title}</Typography>
					</Box>
				</Grid>
			</Grid>
		</JobBox>
	);
};

export default JobItem;
