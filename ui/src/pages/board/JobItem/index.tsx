import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import { JobBox } from './styled';
import { IJobItem } from '@interfaces/jobs';

const JobItem = (props: IJobItem) => {
	return <JobBox>{props.job.title}</JobBox>;
};

export default JobItem;
