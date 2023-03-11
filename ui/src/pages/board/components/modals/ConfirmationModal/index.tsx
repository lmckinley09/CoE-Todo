import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { StatusCodes } from 'http-status-codes';
import { Button, Grid, Modal, Typography } from '@mui/material';
import { IModal } from '@interfaces/modals';
import { ModalBox } from '../styled';
import useDeleteBoard from '@hooks/integrationHooks/useDeleteBoard';

const ConfirmationModal = (props: IModal) => {
	const { open, handleClose } = props;
	const navigate = useNavigate();
	const params = useParams();
	const queryClient = useQueryClient();

	const { mutate } = useDeleteBoard();

	const deleteBoard = async () => {
		mutate(Number(params.boardId), {
			onSuccess: async (response) => {
				if (response.status === StatusCodes.NO_CONTENT) {
					await queryClient.refetchQueries(['boards']);
					navigate('/boards');
				}
			},
			onError: (error: any) => {
				if (error.response.status === StatusCodes.UNAUTHORIZED) {
					navigate(`/login`);
				}
				if (error.response.status === StatusCodes.BAD_REQUEST) {
					console.log('error');
				}
			},
		});
	};

	return (
		<Modal open={open}>
			<ModalBox>
				<Grid container justifyContent="center">
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Are you sure you want to delete this board?
					</Typography>
					<Grid container justifyContent="space-between" padding="10px 70px">
						<Button variant="contained" onClick={() => handleClose(false)}>
							Cancel
						</Button>
						<Button variant="contained" onClick={() => deleteBoard()}>
							Confirm
						</Button>
					</Grid>
				</Grid>
			</ModalBox>
		</Modal>
	);
};

export default ConfirmationModal;
