import React from 'react';
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import { BoardBox } from './styled';

const BoardItem = () => {
	return (
		<BoardBox>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={1}
				// divider={<Divider orientation="vertical" flexItem />}
			>
				<Typography variant="h6">Board Name </Typography>

				<Box display="inline-flex" alignItems="center">
					<Typography>1</Typography>
					<Tooltip title="Projects" placement="top" enterDelay={500}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<PlaylistAddCheckCircleOutlinedIcon />
						</Avatar>
					</Tooltip>

					<Typography>3</Typography>
					<Tooltip title="Tasks" placement="top" enterDelay={500}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<CheckCircleOutlineIcon />
						</Avatar>
					</Tooltip>

					<Typography>6</Typography>
					<Tooltip title="Quick Ticks" placement="top" enterDelay={500}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<AlarmOnIcon />
						</Avatar>
					</Tooltip>
				</Box>
			</Stack>
		</BoardBox>
	);
};

export default BoardItem;
