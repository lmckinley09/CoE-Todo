import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
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

const CreateBoardModal = (props: IModal) => {
	const { open, handleClose } = props;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [displayShare, setDisplayShare] = useState(false);
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
				onSuccess: async (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						await queryClient.refetchQueries(['boards']);
						setDisplayShare(false);
						formik.resetForm();
						handleClose(false);
					}
				},
				onError: (error: any) => {
					if (error.response.status === StatusCodes.UNAUTHORIZED) {
						navigate(`/login`);
					}
					actions.setStatus({ statusCode: error.response.status });
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
		const updated = [...users];
		if (updated.length > 1) {
			const updatedUsers = updated.splice(index, 1);
			setUsers(updatedUsers);
			formik.setFieldValue('users', updatedUsers);
		} else {
			setUsers([]);
			formik.setFieldValue('users', []);
		}
	};

	const addUsersForm = () => {
		return displayShare ? (
			<>
				<Grid container>
					<Typography sx={{ marginTop: '15px' }}>Share with...</Typography>
					<Grid item width="90%" sx={{ marginTop: '5px' }}>
						<InputLabel id="board-name-label">Email</InputLabel>
						<TextField
							id="email"
							name="email"
							type="email"
							inputProps={{ 'data-testid': 'email-input' }}
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
							aria-label="add-email"
							data-testid="add-user-email-button"
							disabled={!isEmail(email)}
							onClick={() => addUser()}
						>
							<AddIcon />
						</IconButton>
					</Grid>
				</Grid>
				{formik.values.users.map((user, index) => {
					return (
						<Box key={user} sx={{ mt: '10px' }} data-testid={`email-${index}`}>
							{user}
							<IconButton
								size="small"
								color="secondary"
								data-testid={`delete-user-${index}-email-button`}
								onClick={() => removeUser(index)}
							>
								<CloseIcon />
							</IconButton>
						</Box>
					);
				})}
			</>
		) : (
			<Box mt="10px">
				<Grid container alignItems="center">
					<Grid item>
						<Typography>Add users to collaborate on your board</Typography>
					</Grid>
					<Grid item>
						<IconButton
							size="small"
							color="secondary"
							data-testid="add-user-button"
							onClick={() => setDisplayShare(true)}
							sx={{ display: 'inline-flex' }}
						>
							<AddIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		);
	};

	const statusAlert = () => {
		if (formik.status) {
			if (formik.status?.statusCode === StatusCodes.BAD_REQUEST) {
				return (
					<Alert severity="error" data-testid="error-alert" sx={{ mt: '10px' }}>
						Error creating board
					</Alert>
				);
			} else {
				return (
					<Alert severity="warning" data-testid="warning-alert" sx={{ mt: '10px' }}>
						Something went wrong, please try again later.
					</Alert>
				);
			}
		}
	};

	return (
		<Modal open={open} onClose={handleClose} data-testid="create-board-modal">
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
							data-testid="close-create-modal-button"
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
							inputProps={{ 'data-testid': 'board-name-input' }}
							fullWidth
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
					</Grid>
					{addUsersForm()}
					{statusAlert()}
					<Button
						type="submit"
						data-testid="create-board-button"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create
					</Button>
				</Box>
			</ModalBox>
		</Modal>
	);
};

export default CreateBoardModal;
