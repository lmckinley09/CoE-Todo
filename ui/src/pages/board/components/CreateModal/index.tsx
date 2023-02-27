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
	title: yup.string().required('Title is required'),
	description: yup.string().max(2000, '2000 Max Character Length'),
	typeId: yup.string().required('Job Type required'),
	completionDate: yup.date().required('Date required'),
});

const CreateModal = (props: IAddJobModal) => {
	const formik = useFormik({
		initialValues: {
			typeId: 1,
			title: '',
			description: '',
			status: 'Not Started',
			completionDate: new Date(),
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			console.log(values);
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
				<Box component="form" noValidate onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item width="50%">
							<InputLabel id="job-type-select-label">Job Type</InputLabel>
							<Select
								fullWidth
								labelId="job-type-select-label"
								id="typeId"
								name="typeId"
								label="Job Type"
								onChange={formik.handleChange}
								value={formik.values.typeId}
							>
								<MenuItem value={1}>Quick Tick</MenuItem>
								<MenuItem value={2}>Task</MenuItem>
								<MenuItem value={3}>Project</MenuItem>
							</Select>
						</Grid>

						<Grid item width="50%">
							<InputLabel id="job-completion-date-label">Completion Date</InputLabel>
							<DatePicker
								openTo="day"
								views={['year', 'month', 'day']}
								value={formik.values.completionDate}
								onChange={formik.handleChange}
								renderInput={(params) => (
									<TextField
										id="completionDate"
										name="completionDate"
										fullWidth
										{...params}
									/>
								)}
							/>
						</Grid>
					</Grid>

					<InputLabel id="job-title-label" sx={{ marginTop: '10px' }}>
						Title
					</InputLabel>
					<TextField
						id="title"
						name="title"
						autoComplete="title"
						fullWidth
						value={formik.values.title}
						onChange={formik.handleChange}
						error={formik.touched.title && Boolean(formik.errors.title)}
						helperText={formik.touched.title && formik.errors.title}
					/>

					<InputLabel id="job-description-label" sx={{ marginTop: '10px' }}>
						Description
					</InputLabel>
					<RichTextEditor
						setFieldValue={(val) => formik.setFieldValue('description', val)}
						value={formik.values.description}
						error={formik.errors.description}
					/>

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Create
					</Button>
				</Box>
			</ModalBox>
		</Modal>
	);
};

export default CreateModal;
