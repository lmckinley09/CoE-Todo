import React from 'react';
import { JobBox } from './styled';
import { IJobItem, IUpdateJob } from '@interfaces/jobs';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import useUpdateJob from '@hooks/integrationHooks/useUpdateJob';
import { StatusCodes } from 'http-status-codes';

const JobItem = (props: IJobItem) => {
	const { job } = props;
	const { mutate } = useUpdateJob(job.id);

	const isDone = job.status === 'Done';

	const handleCheckboxChange = () => {
		const status = job.status === 'Done' ? 'Done' : 'Not Started';

		const updatedJob: IUpdateJob = {
			title: job.title,
			description: job.description,
			status: status,
			completionDate: job.completionDate,
			typeId: job.typeId,
		};
		mutate(updatedJob, {
			onSuccess: (response) => {
				// if (response.status === StatusCodes.OK) {
				// 	console.log(response);
				// }
			},
			onError: (error: any) => {
				// if (error.response.status === StatusCodes.BAD_REQUEST) {
				// 	console.log('no');
				// }
			},
		});
	};

	return (
		<JobBox>
			<Grid container spacing={1}>
				<Grid item>
					<Checkbox
						color="secondary"
						checked={isDone}
						onChange={handleCheckboxChange}
					/>
				</Grid>
				<Grid item>
					<Box onClick={() => props.openEditModal(job)}>
						<Typography>{job.title}</Typography>
					</Box>
				</Grid>
			</Grid>
		</JobBox>
	);
};

export default JobItem;
