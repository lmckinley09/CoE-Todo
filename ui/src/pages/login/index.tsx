import React, { useState } from 'react';
import {
	Avatar,
	Alert,
	Box,
	Button,
	CssBaseline,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LandingImage from '@assets/landing_copy.png';
import useAuth from '@hooks/integrationHooks/useAuth';
import useTokens from '@hooks/integrationHooks/useTokens';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SignUp from './components/SignUp';

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

const Login = () => {
	const { mutate } = useAuth();
	const { checkIfValidToken } = useTokens();
	const navigate = useNavigate();

	const [toggleSignUp, setToggleSignUp] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			mutate(values, {
				onSuccess: (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						console.log('success', response.data);
						checkIfValidToken(response.data);
						navigate('/boards');
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

	const statusAlert = () => {
		if (formik.status) {
			if (formik.status?.statusCode === StatusCodes.BAD_REQUEST) {
				return (
					<Alert severity="error">
						The email or password entered is incorrect. Please try again.
					</Alert>
				);
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
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${LandingImage})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			{toggleSignUp ? (
				<SignUp setToggleSignUp={setToggleSignUp} />
			) : (
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
					sx={{ backgroundColor: '#FFFCF9' }}
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={formik.handleSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
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
								autoComplete="current-password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Login
							</Button>
							<Grid container>
								<Grid item xs>
									<Button variant="text">Forgot password?</Button>
								</Grid>
								<Grid item>
									<Button variant="text" onClick={() => setToggleSignUp(true)}>
										Sign Up
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
			)}
		</Grid>
	);
};

export default Login;
