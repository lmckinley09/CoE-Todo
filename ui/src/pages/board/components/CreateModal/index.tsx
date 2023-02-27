import React, { Dispatch, SetStateAction } from 'react';
import {
	Button,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material';
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
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Text in a modal
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
				<TextField
					margin="normal"
					fullWidth
					id="title"
					label="Title"
					name="title"
					autoComplete="title"
					autoFocus
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>

				<RichTextEditor />

				<InputLabel id="job-type-select-label">Job Type</InputLabel>
				<Select
					fullWidth
					labelId="job-type-select-label"
					id="job-type-select"
					// value={age}
					label="jobType"
					// onChange={handleChange}
					defaultValue={1}
				>
					<MenuItem value={1}>Quick Tick</MenuItem>
					<MenuItem value={2}>Task</MenuItem>
					<MenuItem value={3}>Project</MenuItem>
				</Select>
				{/* description */}
				{/* status */}
				{/* completion date */}
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{`Create`}
				</Button>
			</ModalBox>
		</Modal>
	);
};

export default CreateModal;
