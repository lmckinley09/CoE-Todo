import styled from 'styled-components';
import { Box } from '@mui/system';

export const ModalBox = styled(Box)`
	position: absolute;
	padding: 30px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600px;
	min-height: 390px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 24;
`;
