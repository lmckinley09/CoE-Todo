import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, CssBaseline, Grid, Typography } from '@mui/material';
import { BoardActions, FocusArea, StyledBox } from './styled';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';

const Board = (): JSX.Element => {
	const params = useParams();

	const { data: board } = useGetBoard(Number(params.boardId));

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
							<Typography variant="h4">Quick Ticks</Typography>
						</StyledBox>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<StyledBox>
							<Typography variant="h4">Tasks</Typography>
						</StyledBox>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<StyledBox>
							<Typography variant="h4">Projects</Typography>
						</StyledBox>
					</Grid>
				</Grid>
			</Grid>
		);
	}
	return <Alert severity="error">Error Loading Board Details</Alert>;
};

export default Board;
