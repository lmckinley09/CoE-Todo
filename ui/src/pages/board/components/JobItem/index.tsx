import React, { useState } from 'react';
import { JobBox } from './styled';
import { IJobItem } from '@interfaces/jobs';
import { CheckBox } from '@mui/icons-material';

const JobItem = (props: IJobItem) => {
	const { job } = props;

	return (
		<JobBox onClick={() => props.openEditModal(job)}>
			<CheckBox />
			{job.title}
		</JobBox>
	);
};

export default JobItem;
