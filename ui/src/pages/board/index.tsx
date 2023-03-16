import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { orderBy } from 'lodash';
import {
	Alert,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Skeleton,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { BoardActions, StyledBox } from './styled';
import {
	CreateJobModal,
	EditModal,
	ConfirmationModal,
	JobItem,
	Toggle,
} from './components';
import { IJob } from '@interfaces/jobs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';
import useGetJobs from '@hooks/integrationHooks/useGetJobs';
import useUpdateBoard from '@hooks/integrationHooks/useUpdateBoard';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
	name: yup.string().min(3).required('Board Name is required'),
});

const Board = (): JSX.Element => {
	const [selectedJob, setSelectedJob] = useState<IJob | undefined>();
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const [editName, setEditName] = useState(false);
	const [displayNotification, setDisplayNotification] = useState(false);
	const [displayDone, setDisplayDone] = useState(true);

	const params = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const boardResponse = useGetBoard(Number(params.boardId));
	const jobsResponse = useGetJobs(Number(params.boardId));
	const { mutate } = useUpdateBoard(Number(params.boardId));

	const board = boardResponse?.data?.data;
	const jobs = jobsResponse?.data?.data;

	const handleCreateModalOpen = () => setCreateModalOpen(true);
	const handleCreateModalClose = () => setCreateModalOpen(false);

	const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

	const handleEditModalClose = () => {
		setSelectedJob(undefined);
		setEditModalOpen(false);
	};

	useEffect(() => {
		setEditModalOpen(true);
	}, [selectedJob]);

	const openEditModal = (job: IJob) => {
		setSelectedJob(job);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: board?.name || '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			mutate(values, {
				onSuccess: async (response) => {
					actions.setStatus();
					if (response.status === StatusCodes.OK) {
						await queryClient.refetchQueries(['board']);
						setEditName(false);
					}
				},
				onError: (error: any) => {
					if (error.response.status === StatusCodes.UNAUTHORIZED) {
						navigate('/login');
					}
					if (error.response.status === StatusCodes.BAD_REQUEST) {
						actions.setStatus({ statusCode: error.response.status });
					}
				},
			});
		},
	});

	const filterByJobType = (jobs: IJob[], jobType: string) => {
		const filtered = jobs.filter((job) => {
			return job.jobType?.description === jobType;
		});
		return orderBy(
			filtered,
			['status', 'completionDate', 'created'],
			['desc', 'desc', 'desc']
		);
	};

	const filterByStatus = (jobs: IJob[]) => {
		return jobs.filter((job) => {
			return job.status !== 'Done';
		});
	};

	const toggleHandler = (event: any) => {
		setDisplayDone(event.target.checked);
	};

	const displayByJobType = (jobType: string, errorMessage: string) => {
		if (jobsResponse.isLoading) {
			return (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					style={{ minHeight: '100vh' }}
				>
					<Grid item xs={3} mt="1rem">
						<CircularProgress size="5rem" data-testid="job-loader" />
					</Grid>
				</Grid>
			);
		}
		if (jobs) {
			let filteredJobs = filterByJobType(jobs, jobType);
			if (!displayDone) filteredJobs = filterByStatus(filteredJobs);
			return filteredJobs?.map((job) => (
				<JobItem key={job.id} job={job} openEditModal={openEditModal} />
			));
		} else {
			return (
				<Alert data-testid="jobs-error-alert" severity="error">
					{errorMessage}
				</Alert>
			);
		}
	};

	const handleNotificationClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setDisplayNotification(false);
	};

	const displayNotificationMessage = () => {
		return (
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={displayNotification}
				autoHideDuration={6000}
				onClose={handleNotificationClose}
			>
				<Alert
					onClose={handleNotificationClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					Changes saved
				</Alert>
			</Snackbar>
		);
	};

	if (boardResponse.error) {
		return (
			<Alert data-testid="board-error-alert" severity="error">
				{'An error has occurred: ' + boardResponse.error}
			</Alert>
		);
	}

	return (
		<Grid container sx={{ height: '100vh', flexDirection: 'column' }}>
			<Grid item>
				<BoardActions>
					{editName ? (
						<Box
							component="form"
							noValidate
							onSubmit={formik.handleSubmit}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<TextField
								margin="normal"
								id="name"
								data-testid="board-name-input"
								label="Board Name"
								name="name"
								autoComplete="name"
								autoFocus
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
							<IconButton
								type="submit"
								color="secondary"
								data-testid="submit-board-name-button"
								sx={{ ml: '5px' }}
							>
								<DoneIcon />
							</IconButton>
						</Box>
					) : boardResponse.isLoading ? (
						<Skeleton
							variant="rounded"
							width={210}
							height={60}
							sx={{ bgcolor: '#f6d8c5' }}
						/>
					) : (
						<>
							<Typography variant="h4" data-testid="board-name">
								{board?.name}
							</Typography>
							<IconButton
								color="secondary"
								aria-label="edit-board-name"
								data-testid="edit-board-name-button"
								onClick={() => setEditName(true)}
								sx={{ ml: '5px' }}
							>
								<EditIcon />
							</IconButton>
							<IconButton
								color="secondary"
								aria-label="delete-board"
								data-testid="delete-board-button"
								sx={{ ml: '5px' }}
								onClick={() => setConfirmationModalOpen(true)}
							>
								<DeleteIcon />
							</IconButton>
							<Toggle
								id="toggle-done-view"
								checked={displayDone}
								onChange={toggleHandler}
							/>
						</>
					)}
				</BoardActions>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={4} md={4}>
					<StyledBox>
						<>
							<Grid container justifyContent="space-between">
								<Typography variant="h4">Quick Ticks</Typography>
								<IconButton
									color="secondary"
									aria-label="add quick tick"
									data-testid="add-quick-tick-button"
									onClick={() => handleCreateModalOpen()}
								>
									<AddIcon />
								</IconButton>
							</Grid>
							{displayByJobType('tick', 'Error Loading Quick Ticks')}
						</>
					</StyledBox>
				</Grid>
				<Grid item xs={12} sm={4} md={4}>
					<StyledBox>
						<Grid container justifyContent="space-between">
							<Typography variant="h4">Tasks</Typography>
							<IconButton
								color="secondary"
								aria-label="add task"
								data-testid="add-task-button"
								onClick={() => handleCreateModalOpen()}
							>
								<AddIcon />
							</IconButton>
						</Grid>
						{displayByJobType('task', 'Error Loading Tasks')}
					</StyledBox>
				</Grid>
				<Grid item xs={12} sm={4} md={4}>
					<StyledBox>
						<Grid container justifyContent="space-between">
							<Typography variant="h4">Projects</Typography>
							<IconButton
								color="secondary"
								aria-label="add project"
								data-testid="add-project-button"
								onClick={() => handleCreateModalOpen()}
							>
								<AddIcon />
							</IconButton>
						</Grid>
						{displayByJobType('project', 'Error Loading Projects')}
					</StyledBox>
				</Grid>
			</Grid>
			<CreateJobModal
				open={createModalOpen}
				handleClose={handleCreateModalClose}
			/>
			{selectedJob && (
				<EditModal
					open={editModalOpen}
					handleClose={handleEditModalClose}
					job={selectedJob}
					setDisplayNotification={setDisplayNotification}
				/>
			)}
			<ConfirmationModal
				open={confirmationModalOpen}
				handleClose={handleConfirmationModalClose}
			/>
			{displayNotificationMessage()}
		</Grid>
	);
};

export default Board;
