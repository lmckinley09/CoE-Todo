import React, { Dispatch, SetStateAction } from 'react';
import {
	Avatar,
	Alert,
	Box,
	Button,
	Grid,
	Paper,
	TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import useCreateUser from '@hooks/integrationHooks/useCreateUser';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import * as yup from 'yup';
import defaultProfile from '@assets/icons8-user-60.png';

const validationSchema = yup.object({
	firstName: yup
		.string()
		.min(1, 'Too Short')
		.max(50, 'Too Long')
		.required('First Name is Required'),
	lastName: yup
		.string()
		.min(2, 'Too Short')
		.max(50, 'Too Long')
		.required('Last Name is Required'),
	email: yup.string().email('Enter a valid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

interface ISignUp {
	setToggleSignUp: Dispatch<SetStateAction<boolean>>;
	setNewUserEmail: Dispatch<SetStateAction<string>>;
}

const SignUp = (props: ISignUp) => {
	const { mutate } = useCreateUser();

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			profilePicture: `url(${defaultProfile})`,
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			mutate(values, {
				onSuccess: (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						props.setNewUserEmail(values.email);
						props.setToggleSignUp(false);
					}
				},
				onError: (error: any) => {
					if (error.response.status === StatusCodes.BAD_REQUEST) {
						actions.setStatus({ statusCode: error.response.status });
						props.setNewUserEmail('');
					}
				},
			});
		},
	});

	const statusAlert = () => {
		if (formik.status) {
			if (formik.status?.statusCode === StatusCodes.BAD_REQUEST) {
				return <Alert severity="error">This email is already in use.</Alert>;
			} else {
				return (
					<Alert severity="warning">
						Something went wrong, please try again later.
					</Alert>
				);
			}
		}
	};

	return (
		<Grid
			item
			xs={12}
			sm={8}
			md={5}
			component={Paper}
			elevation={6}
			square
			sx={{ backgroundColor: '#FFFCF9' }}
			data-testid="sign-up-panel"
		>
			<Box
				sx={{
					my: 8,
					mx: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<PersonIcon />
				</Avatar>

				<Box
					component="form"
					noValidate
					onSubmit={formik.handleSubmit}
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						fullWidth
						id="firstName"
						label="First Name"
						name="firstName"
						autoFocus
						inputProps={{ 'data-testid': 'first-name-input' }}
						value={formik.values.firstName}
						onChange={formik.handleChange}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
					/>
					<TextField
						margin="normal"
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						inputProps={{ 'data-testid': 'last-name-input' }}
						value={formik.values.lastName}
						onChange={formik.handleChange}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
					/>
					<TextField
						margin="normal"
						fullWidth
						id="email"
						label="Email "
						name="email"
						autoComplete="email"
						inputProps={{ 'data-testid': 'email-input' }}
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						inputProps={{ 'data-testid': 'password-input' }}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>

					<Button
						data-testid="signup-button"
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Button variant="text">Forgot password?</Button>
						</Grid> */}
						<Grid item>
							<Button
								data-testid="toggle-login-button"
								variant="text"
								onClick={() => props.setToggleSignUp(false)}
							>
								Login
							</Button>
						</Grid>
					</Grid>
					<Box
						sx={{
							marginTop: '10px',
						}}
					>
						{statusAlert()}
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default SignUp;
