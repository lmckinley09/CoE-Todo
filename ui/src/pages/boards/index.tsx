import React from 'react';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { StyledBox } from './styled';
import BoardItem from './components/BoardItem';
import useGetBoards from '@hooks/integrationHooks/useGetBoards';

const Boards = () => {
	const { data: boards } = useGetBoards();

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item xs={12} sm={6} md={6}>
				<Typography variant="h4" marginLeft="20px" mt="10px">
					My Boards
				</Typography>

				<StyledBox>
					{boards &&
						boards?.data?.map((board) => {
							return <BoardItem key={board.id} board={board} />;
						})}
				</StyledBox>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				<Typography variant="h4" marginLeft="20px" mt="10px">
					Shared Boards
				</Typography>
				<StyledBox>{/* <BoardItem /> */}</StyledBox>
			</Grid>
		</Grid>
	);
};

export default Boards;
