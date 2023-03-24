import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import {
	Alert,
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
import { IModal } from '@interfaces/modals';
import useCreateJob from '@hooks/integrationHooks/useCreateJob';
import { ModalBox } from '../styled';
import RichTextEditor from '../../RichTextEditor';
import { validationSchema } from '../validation';

const CreateJobModal = (props: IModal) => {
	const { open, handleClose } = props;
	const navigate = useNavigate();
	const params = useParams();
	const queryClient = useQueryClient();

	const { mutate } = useCreateJob(Number(params.boardId));

	const formik = useFormik({
		initialValues: {
			typeId: 1,
			title: '',
			description: '',
			status: 'Not Started',
			completionDate: new Date().toISOString(),
		},
		// validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			console.log('submit hit', mutate);
			mutate(values, {
				onSuccess: async (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						await queryClient.refetchQueries(['jobs']);
						formik.resetForm();
						handleClose(false);
					}
				},
				onError: (error: any) => {
					if (error.response.status === StatusCodes.UNAUTHORIZED) {
						navigate(`/login`);
					}
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
		<Modal open={open} onClose={handleClose} data-testid="create-job-modal">
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
							data-testid="close-create-modal-button"
							onClick={() => handleClose(false)}
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
								inputFormat="dd/MM/yyyy"
								value={formik.values.completionDate}
								onChange={(value) => formik.setFieldValue('completionDate', value)}
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
					{statusAlert()}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						data-testid="submit-job-button"
						sx={{ mt: 3, mb: 2 }}
					>
						Create
					</Button>
				</Box>
			</ModalBox>
		</Modal>
	);
};

export default CreateJobModal;
