import React, { useState } from 'react';
import {
	CircularProgress,
	CssBaseline,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { StyledBox } from './styled';
import BoardItem from './components/BoardItem';
import useGetBoards from '@hooks/integrationHooks/useGetBoards';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from './components/modals/CreateModal';

const Boards = () => {
	const boardsResponse = useGetBoards();

	const boards = boardsResponse.data?.data;

	const [createModalOpen, setCreateModalOpen] = useState(false);

	const handleCreateModalOpen = () => setCreateModalOpen(true);
	const handleCreateModalClose = () => setCreateModalOpen(false);

	const displayLoader = () => {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				style={{ minHeight: '100vh' }}
				data-testid="boards-loader"
			>
				<Grid item xs={3} mt="1rem">
					<CircularProgress size="5rem" />
				</Grid>
			</Grid>
		);
	};

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item xs={12} sm={6} md={6}>
				<Grid container alignItems="baseline">
					<Typography
						variant="h4"
						marginLeft="20px"
						mt="10px"
						data-testid="owner-boards-header"
					>
						My Boards
					</Typography>
					<IconButton
						color="secondary"
						aria-label="add-board"
						data-testid="add-board-button"
						onClick={() => handleCreateModalOpen()}
					>
						<AddIcon />
					</IconButton>
				</Grid>

				<StyledBox>
					{boardsResponse.isLoading && displayLoader()}
					{boards &&
						boards?.owner.map((board) => {
							return <BoardItem key={board.id} board={board} />;
						})}
				</StyledBox>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				<Typography
					variant="h4"
					marginLeft="20px"
					mt="10px"
					data-testid="shared-boards-header"
				>
					Shared Boards
				</Typography>
				<StyledBox>
					{boardsResponse.isLoading && displayLoader()}
					{boards &&
						boards?.shared.map((board) => {
							return <BoardItem key={board.id} board={board} />;
						})}
				</StyledBox>
			</Grid>
			<CreateModal open={createModalOpen} handleClose={handleCreateModalClose} />
		</Grid>
	);
};

export default Boards;
