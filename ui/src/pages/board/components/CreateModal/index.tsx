import React, { Dispatch, SetStateAction } from 'react';
import {
	Button,
	Box,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import { ModalBox } from './styled';
import RichTextEditor from '../RichTextEditor';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import * as yup from 'yup';
interface IAddJobModal {
	open: boolean;
	handleClose: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = yup.object({
	// email: yup.string().email('Enter a valid email').required('Email is required'),
	// password: yup.string().required('Password is required'),
});

const CreateModal = (props: IAddJobModal) => {
	const formik = useFormik({
		initialValues: {
			typeId: 1,
			title: '',
			description: '',
			status: '',
			completionDate: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			// mutate(values, {
			// 	onSuccess: (response) => {
			// 		actions.setStatus();
			// 		if (response.status === StatusCodes.OK) {
			// 			checkIfValidToken(response.data);
			// 			navigate('/boards');
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

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<ModalBox>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Create a new job
						</Typography>
					</Grid>
					<Grid item>
						<IconButton
							color="secondary"
							aria-label="close-create-modal"
							onClick={() => props.handleClose(false)}
						>
							<CloseIcon />
						</IconButton>
					</Grid>
				</Grid>

				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
				</Typography>

				<InputLabel id="job-type-select-label">Job Type</InputLabel>
				<Select
					fullWidth
					labelId="job-type-select-label"
					id="job-type-select"
					label="Job Type"
					// onChange={handleChange}
					defaultValue={1}
				>
					<MenuItem value={1}>Quick Tick</MenuItem>
					<MenuItem value={2}>Task</MenuItem>
					<MenuItem value={3}>Project</MenuItem>
				</Select>

				<InputLabel id="job-title-label">Title</InputLabel>
				<TextField
					margin="normal"
					fullWidth
					id="title"
					name="title"
					autoComplete="title"
					autoFocus
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>

				<Box sx={{ marginTop: '10px' }}>
					<InputLabel id="job-description-label">Description</InputLabel>
					<RichTextEditor />
				</Box>

				<Box sx={{ marginTop: '20px' }}>
					<InputLabel id="job-completion-date-label">Completion Date</InputLabel>
					<DatePicker
						openTo="day"
						views={['year', 'month', 'day']}
						value={'2023-01-01'}
						onChange={() => {
							console.log('date');
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Box>

				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{`Create`}
				</Button>
			</ModalBox>
		</Modal>
	);
};

export default CreateModal;
