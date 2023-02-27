import React, { useState } from 'react';
import { JobBox } from './styled';
import { IJobItem } from '@interfaces/jobs';
import { CheckBox } from '@mui/icons-material';
import EditModal from '../modals/EditModal';

const JobItem = (props: IJobItem) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalOpen = () => setModalOpen(true);
	const handleModalClose = () => setModalOpen(false);

	const { job } = props;

	return (
		<JobBox onClick={() => handleModalOpen()}>
			<CheckBox />
			{job.title}
			<EditModal job={job} open={modalOpen} handleClose={handleModalClose} />
		</JobBox>
	);
};

export default JobItem;
