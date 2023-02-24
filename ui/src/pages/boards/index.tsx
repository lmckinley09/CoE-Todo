import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Alert,
	Box,
	Button,
	CssBaseline,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { StyledBox, BoardBox } from './styled';

const boards = () => {
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<Grid item xs={12} sm={6} md={6}>
				<h1>My Boards</h1>
				<StyledBox>
					<BoardBox>1</BoardBox>
					<BoardBox>1</BoardBox>
					<BoardBox>1</BoardBox>
				</StyledBox>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				<h1>Shared Boards</h1>
				<StyledBox>
					<BoardBox>1</BoardBox>
				</StyledBox>
			</Grid>
		</Grid>
	);
};

export default boards;
