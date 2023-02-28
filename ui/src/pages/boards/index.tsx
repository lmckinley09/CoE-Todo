import React, { useState } from 'react';
import { CssBaseline, Grid, IconButton, Typography } from '@mui/material';
import { StyledBox } from './styled';
import BoardItem from './components/BoardItem';
import useGetBoards from '@hooks/integrationHooks/useGetBoards';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from './components/modals/CreateModal';

const Boards = () => {
	const { data: boards } = useGetBoards();

	const [createModalOpen, setCreateModalOpen] = useState(false);

	const handleCreateModalOpen = () => setCreateModalOpen(true);
	const handleCreateModalClose = () => setCreateModalOpen(false);

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item xs={12} sm={6} md={6}>
				<Grid container alignItems="baseline">
					<Typography variant="h4" marginLeft="20px" mt="10px">
						My Boards
					</Typography>
					<IconButton
						color="secondary"
						aria-label="add quick tick"
						onClick={() => handleCreateModalOpen()}
					>
						<AddIcon />
					</IconButton>
				</Grid>

				<StyledBox>
					{boards &&
						boards?.data?.owner.map((board) => {
							return <BoardItem key={board.id} board={board} />;
						})}
				</StyledBox>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				<Typography variant="h4" marginLeft="20px" mt="10px">
					Shared Boards
				</Typography>
				<StyledBox>
					{boards &&
						boards?.data?.shared.map((board) => {
							return <BoardItem key={board.id} board={board} />;
						})}
				</StyledBox>
			</Grid>
			<CreateModal open={createModalOpen} handleClose={handleCreateModalClose} />
		</Grid>
	);
};

export default Boards;
