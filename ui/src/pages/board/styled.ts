import styled from 'styled-components';
import { Box } from '@mui/material';

export const BoardActions = styled(Box)`
	display: flex;
	align-items: center;
	margin-top: 20px;
	min-height: 100px;
	padding: 10px;
`;

export const FocusArea = styled(Box)`
	display: flex;
	align-items: center;
	background-color: #f4cfb7;
	margin-top: 20px;
	min-height: 100px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
		0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const StyledBox = styled(Box)`
	background-color: #f4cfb7;
	min-height: 65vh;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
		0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
