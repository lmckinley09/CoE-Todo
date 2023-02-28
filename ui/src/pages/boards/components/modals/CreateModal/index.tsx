import React from 'react';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import {
	Alert,
	Button,
	Box,
	Grid,
	IconButton,
	InputLabel,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IModal } from '@interfaces/modals';
import useCreateBoard from '@hooks/integrationHooks/useCreateBoard';
import { ModalBox } from '../styled';
import { validationSchema } from '../validation';

const CreateModal = (props: IModal) => {
	const { open, handleClose } = props;

	// const { mutate } = useCreateBoard();

	const formik = useFormik({
		initialValues: {
			name: 1,
			users: [],
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			// mutate(values, {
			// 	onSuccess: (response) => {
			// 		actions.setStatus();
			// 		if (response.status === StatusCodes.OK) {
			// 			formik.resetForm();
			// 			handleClose(false);
			// 		}
			// 	},
			// 	onError: (error: any) => {
			// 		if (error.response.status === StatusCodes.BAD_REQUEST) {
			// 			actions.setStatus({ statusCode: error.response.status });
			// 		}
			// 	},
			// });
		},
	});

	const statusAlert = () => {
		if (formik.status) {
			if (formik.status?.statusCode === StatusCodes.BAD_REQUEST) {
				return (
					<Alert severity="error" sx={{ mt: '10px' }}>
						Error creating job
					</Alert>
				);
			} else {
				return (
					<Alert severity="warning" sx={{ mt: '10px' }}>
						Something went wrong, please try again later.
					</Alert>
				);
			}
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<ModalBox>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography id="create-board-modal-title" variant="h6" component="h2">
							Create a new board
						</Typography>
					</Grid>
					<Grid item>
						<IconButton
							color="secondary"
							aria-label="close-create-board-modal"
							onClick={() => handleClose(false)}
						>
							<CloseIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Box component="form" noValidate onSubmit={formik.handleSubmit}>
					<Grid container>
						<InputLabel id="board-name-label" sx={{ marginTop: '10px' }}>
							Title
						</InputLabel>
						<TextField
							id="name"
							name="name"
							autoComplete="name"
							fullWidth
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
					</Grid>

					{statusAlert()}
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Create
					</Button>
				</Box>
			</ModalBox>
		</Modal>
	);
};

export default CreateModal;
