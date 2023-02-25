import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Alert,
	CssBaseline,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { BoardActions, FocusArea, StyledBox } from './styled';
import JobItem from './JobItem';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';
import useGetJobs from '@hooks/integrationHooks/useGetJobs';

const Board = (): JSX.Element => {
	const params = useParams();

	const { data: board } = useGetBoard(Number(params.boardId));
	const { data: jobs } = useGetJobs(Number(params.boardId));

	const displayTicks = () => {
		if (jobs && jobs.data) {
			return jobs.data.map((tick) => {
				return <JobItem key={tick.id} job={tick} />;
			});
		} else {
			return <Alert severity="error">Error Loading Quick Ticks</Alert>;
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
									<IconButton color="secondary" aria-label="add quick tick">
										<AddIcon />
									</IconButton>
								</Grid>
								{displayTicks()}
								<p>1</p>
							</>
						</StyledBox>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<StyledBox>
							<Grid container justifyContent="space-between">
								<Typography variant="h4">Tasks</Typography>
								<IconButton color="secondary" aria-label="add task">
									<AddIcon />
								</IconButton>
							</Grid>
						</StyledBox>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<StyledBox>
							<Grid container justifyContent="space-between">
								<Typography variant="h4">Projects</Typography>
								<IconButton color="secondary" aria-label="add project">
									<AddIcon />
								</IconButton>
							</Grid>
						</StyledBox>
					</Grid>
				</Grid>
			</Grid>
		);
	}
	return <Alert severity="error">Error Loading Board Details</Alert>;
};

export default Board;
