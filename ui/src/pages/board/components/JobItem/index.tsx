import React from 'react';
import { JobBox } from './styled';
import { IJobItem } from '@interfaces/jobs';
import { CheckBox } from '@mui/icons-material';

const JobItem = (props: IJobItem) => {
	return (
		<JobBox>
			<CheckBox />
			{props.job.title}
		</JobBox>
	);
};

export default JobItem;
