import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Alert,
	CssBaseline,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { BoardActions, FocusArea, StyledBox } from './styled';
import { CreateModal, JobItem, Toggle } from './components';
import { IGetJobs } from '@interfaces/jobs';
import AddIcon from '@mui/icons-material/Add';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';
import useGetJobs from '@hooks/integrationHooks/useGetJobs';

const Board = (): JSX.Element => {
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const params = useParams();
	const { data: board } = useGetBoard(Number(params.boardId));
	const { data: jobs } = useGetJobs(Number(params.boardId));

	const handleCreateModalOpen = () => setCreateModalOpen(true);
	const handleCreateModalClose = () => setCreateModalOpen(false);

	const filterByJobType = (jobs: IGetJobs, jobType: string) => {
		if (jobs && jobs.data) {
			return jobs.data.filter((job) => {
				return job.job_type?.type_description === jobType;
			});
		}
	};

	const displayByJobType = (jobType: string, errorMessage: string) => {
		if (jobs) {
			const filteredJobs = filterByJobType(jobs, jobType);
			return filteredJobs?.map((job) => <JobItem key={job.id} job={job} />);
		} else {
			return <Alert severity="error">{errorMessage}</Alert>;
		}
	};

	if (board && board.data) {
		const { name } = board.data;
		return (
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={4}>
						<BoardActions>
							<Typography variant="h4">{name}</Typography>
							<Toggle />
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
							{displayByJobType('project', 'Error Loading Projects')}
						</StyledBox>
					</Grid>
				</Grid>
				<CreateModal open={createModalOpen} handleClose={handleCreateModalClose} />
			</Grid>
		);
	}
	return <Alert severity="error">Error Loading Board Details</Alert>;
};

export default Board;
