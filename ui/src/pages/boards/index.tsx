import React from 'react';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { StyledBox } from './styled';
import BoardItem from './components/BoardItem';

const Boards = () => {
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item xs={12} sm={6} md={6}>
				<Typography variant="h5" marginLeft="10px">
					My Boards
				</Typography>

				<StyledBox>
					<BoardItem />
					<BoardItem />
				</StyledBox>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				<h1>Shared Boards</h1>
				<StyledBox>
					<BoardItem />
				</StyledBox>
			</Grid>
		</Grid>
	);
};

export default Boards;
