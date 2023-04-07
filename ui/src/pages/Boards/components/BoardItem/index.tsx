import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import { BoardBox } from './styled';
import { IBoardItem } from '@interfaces/boards';

const BoardItem = (props: IBoardItem) => {
	const navigate = useNavigate();
	const { id, name, projectCount, taskCount, tickCount } = props.board;
	return (
		<BoardBox
			data-testid={`board-item-${id}`}
			onClick={() => {
				navigate(`/board/${id}`);
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={1}
			>
				<Typography variant="h6">{name}</Typography>

				<Box display="inline-flex" alignItems="center">
					{projectCount !== 0 && (
						<>
							<Typography data-testid={`project-count-board-${id}`}>
								{projectCount}
							</Typography>
							<Tooltip title="Projects" placement="top" enterDelay={200}>
								<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
									<PlaylistAddCheckCircleOutlinedIcon />
								</Avatar>
							</Tooltip>
						</>
					)}

					{taskCount !== 0 && (
						<>
							<Typography data-testid={`task-count-board-${id}`}>
								{taskCount}
							</Typography>
							<Tooltip title="Tasks" placement="top" enterDelay={200}>
								<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
									<CheckCircleOutlineIcon />
								</Avatar>
							</Tooltip>
						</>
					)}
					{tickCount !== 0 && (
						<>
							<Typography data-testid={`tick-count-board-${id}`}>
								{tickCount}
							</Typography>
							<Tooltip title="Quick Ticks" placement="top" enterDelay={200}>
								<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
									<AlarmOnIcon />
								</Avatar>
							</Tooltip>
						</>
					)}
				</Box>
			</Stack>
		</BoardBox>
	);
};

export default BoardItem;
