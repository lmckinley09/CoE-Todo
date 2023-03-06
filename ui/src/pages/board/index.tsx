import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import {
	Alert,
	CircularProgress,
	CssBaseline,
	Grid,
	IconButton,
	Skeleton,
	Snackbar,
	Typography,
} from '@mui/material';
import { BoardActions, FocusArea, StyledBox } from './styled';
import { CreateModal, EditModal, JobItem, Toggle } from './components';
import { IJob } from '@interfaces/jobs';
import AddIcon from '@mui/icons-material/Add';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';
import useGetJobs from '@hooks/integrationHooks/useGetJobs';

const Board = (): JSX.Element => {
	const [selectedJob, setSelectedJob] = useState<IJob | undefined>();
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [displayNotification, setDisplayNotification] = useState(false);
	const [displayDone, setDisplayDone] = useState(true);

	const params = useParams();

	const boardResponse = useGetBoard(Number(params.boardId));
	const jobsResponse = useGetJobs(Number(params.boardId));

	const board = boardResponse.data?.data;
	const jobs = jobsResponse.data?.data;

	const handleCreateModalOpen = () => setCreateModalOpen(true);
	const handleCreateModalClose = () => setCreateModalOpen(false);

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
						<CircularProgress size="5rem" />
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
			return <Alert severity="error">{errorMessage}</Alert>;
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

	// const displayLoader = () => {
	// 	return (
	// 		<Grid
	// 			container
	// 			spacing={0}
	// 			direction="column"
	// 			alignItems="center"
	// 			style={{ minHeight: '100vh' }}
	// 		>
	// 			<Grid item xs={3} mt="1rem">
	// 				<CircularProgress size="5rem" />
	// 			</Grid>
	// 		</Grid>
	// 	);
	// };

	if (boardResponse.error) {
		return (
			<Alert severity="error">
				{'An error has occurred: ' + boardResponse.error}
			</Alert>
		);
	}

	// const { name } = board;
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6} md={4}>
					<BoardActions>
						{boardResponse.isLoading && (
							<Skeleton variant="rounded" width={210} height={60} />
						)}
						<Typography variant="h4">{board?.name}</Typography>
						<Toggle checked={displayDone} onChange={toggleHandler} />
					</BoardActions>
				</Grid>
				<Grid item xs={12} sm={6} md={8}>
					<FocusArea>
						<Typography variant="h4">Next Task</Typography>
					</FocusArea>
				</Grid>
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
									onClick={() => handleCreateModalOpen()}
								>
									<AddIcon />
								</IconButton>
							</Grid>
							{/* {jobsResponse.isLoading && displayLoader()} */}
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
								onClick={() => handleCreateModalOpen()}
							>
								<AddIcon />
							</IconButton>
						</Grid>
						{/* {jobsResponse.isLoading && displayLoader()} */}
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
								onClick={() => handleCreateModalOpen()}
							>
								<AddIcon />
							</IconButton>
						</Grid>
						{/* {jobsResponse.isLoading && displayLoader()} */}
						{displayByJobType('project', 'Error Loading Projects')}
					</StyledBox>
				</Grid>
			</Grid>
			<CreateModal open={createModalOpen} handleClose={handleCreateModalClose} />
			{selectedJob && (
				<EditModal
					open={editModalOpen}
					handleClose={handleEditModalClose}
					job={selectedJob}
					setDisplayNotification={setDisplayNotification}
				/>
			)}
			{displayNotificationMessage()}
		</Grid>
	);
};

export default Board;
