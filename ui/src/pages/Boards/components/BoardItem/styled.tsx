import styled from 'styled-components';
import { Grid } from '@mui/material';

export const BoardBox = styled(Grid)`
	margin-top: 20px;
	margin-left: 5px;
	margin-right: 5px;
	padding: 5px;
	padding-left: 10px;
	min-height: 66px;
	border-radius: 5px;
	box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
		0px 1px 3px 0px rgb(0 0 0 / 12%);
	transition: 0.3s;
	background-color: #df9a5f;
	cursor: pointer;
	:hover {
		filter: brightness(95%);
	}
`;
