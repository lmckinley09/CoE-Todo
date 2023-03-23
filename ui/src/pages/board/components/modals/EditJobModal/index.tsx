import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
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
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from '@mui/x-date-pickers';
import useUpdateJob from '@hooks/integrationHooks/useUpdateJob';
import { IEditModal } from '@interfaces/modals';
import { ModalBox } from '../styled';
import RichTextEditor from '../../RichTextEditor';
import { validationSchema } from '../validation';

const EditJobModal = (props: IEditModal) => {
	const { job, open, handleClose, setDisplayNotification } = props;
	const { mutate } = useUpdateJob(job.id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [editMode, setEditMode] = useState(false);

	const formik = useFormik({
		initialValues: {
			typeId: job.jobType.id,
			title: job.title,
			description: job.description,
			status: job.status,
			completionDate: job.completionDate,
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			mutate(values, {
				onSuccess: async (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						await queryClient.refetchQueries(['jobs']);
						setDisplayNotification(true);
						setEditMode(false);
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
						Error editing job
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
		<Modal
			open={open}
			onClose={handleClose}
			data-testid={`edit-job-modal-${job.id}`}
		>
			<ModalBox>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Grid container alignItems="center">
							<Grid item>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									{editMode ? 'Edit job' : job.title}
								</Typography>
							</Grid>
							<Grid item>
								{!editMode && (
									<IconButton
										color="secondary"
										aria-label="view-button"
										data-testid="toggle-edit-button"
										onClick={() => setEditMode(true)}
										sx={{ ml: '5px' }}
									>
										<EditIcon />
									</IconButton>
								)}
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<IconButton
							color="secondary"
							aria-label="close-edit-modal"
							data-testid="close-edit-modal-button"
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
								disabled={!editMode}
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
								disabled={!editMode}
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
						disabled={!editMode}
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
						readOnly={!editMode}
						toolbarHidden={!editMode}
					/>
					<InputLabel id="job-type-select-label">Status</InputLabel>
					<Select
						fullWidth
						labelId="job-status-select-label"
						id="status"
						name="status"
						label="Status"
						onChange={formik.handleChange}
						value={formik.values.status}
						disabled={!editMode}
					>
						<MenuItem value={'Not Started'}>Not Started</MenuItem>
						<MenuItem value={'Done'}>Done</MenuItem>
					</Select>
					{statusAlert()}
					{editMode && (
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Save
						</Button>
					)}
				</Box>
			</ModalBox>
		</Modal>
	);
};

export default EditJobModal;
