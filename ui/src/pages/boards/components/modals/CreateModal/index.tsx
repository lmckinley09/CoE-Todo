import React, { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IModal } from '@interfaces/modals';
import useCreateBoard from '@hooks/integrationHooks/useCreateBoard';
import { ModalBox } from '../styled';
import { validationSchema } from '../validation';
import isEmail from 'validator/lib/isEmail';

const CreateModal = (props: IModal) => {
	const { open, handleClose } = props;

	const [users, setUsers] = useState<string[]>([]);
	const [email, setEmail] = useState('');
	const [emailTouched, setEmailTouched] = useState(false);

	const { mutate } = useCreateBoard();

	const formik = useFormik({
		initialValues: {
			name: '',
			users: [],
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			mutate(values, {
				onSuccess: (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						// formik.resetForm();
						// handleClose(false);
					}
				},
				onError: (error: any) => {
					if (error.response.status === StatusCodes.BAD_REQUEST) {
						actions.setStatus({ statusCode: error.response.status });
					}
				},
			});
		},
	});

	const addUser = () => {
		const newUsers = Array.from(new Set([...users, email]));
		setUsers(newUsers);
		setEmail('');
		setEmailTouched(false);
		formik.setFieldValue('users', newUsers);
	};

	const removeUser = (index: number) => {
		const updatedUsers = users.splice(index, 1);
		setUsers(updatedUsers);
		formik.setFieldValue('users', updatedUsers);
	};

	const addUsersForm = () => {
		return (
			<>
				<Grid container>
					<Grid item width="90%">
						<InputLabel id="board-name-label" sx={{ marginTop: '10px' }}>
							User Email
						</InputLabel>
						<TextField
							id="email"
							name="email"
							type="email"
							fullWidth
							value={email}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setEmail(event.target.value);
								setEmailTouched(true);
							}}
							onBlur={() => setEmailTouched(true)}
							error={emailTouched && !isEmail(email)}
							helperText={
								emailTouched && !isEmail(email) && 'Please enter a valid email'
							}
						/>
					</Grid>
					<Grid item>
						<IconButton
							sx={{ mt: '40px', ml: '10px' }}
							size="small"
							color="secondary"
							aria-label="add quick tick"
							disabled={!isEmail(email)}
							onClick={() => addUser()}
						>
							<AddIcon />
						</IconButton>
					</Grid>
				</Grid>
				{console.log(formik.values)}
				{formik.values.users.map((user, index) => {
					return (
						<Box key={user} sx={{ mt: '10px' }}>
							{user}
							<IconButton
								size="small"
								color="secondary"
								aria-label="add quick tick"
								onClick={() => removeUser(index)}
							>
								<CloseIcon />
							</IconButton>
						</Box>
					);
				})}
			</>
		);
	};

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
					{addUsersForm()}
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
