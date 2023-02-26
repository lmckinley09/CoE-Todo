import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Typography } from '@mui/material';
import { ModalBox } from './styled';

interface IAddJobModal {
	open: boolean;
	handleClose: Dispatch<SetStateAction<boolean>>;
}

const CreateModal = (props: IAddJobModal) => {
	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<ModalBox>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Text in a modal
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
			</ModalBox>
		</Modal>
	);
};

export default CreateModal;
