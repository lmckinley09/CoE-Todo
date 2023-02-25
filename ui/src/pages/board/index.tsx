import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import useGetBoard from '@hooks/integrationHooks/useGetBoard';

const Board = (): JSX.Element => {
	const params = useParams();

	const { data: board } = useGetBoard(Number(params.boardId));

	if (board && board.data) {
		const { name } = board.data;
		return (
			<>
				<h1>{name}</h1>
			</>
		);
	}
	return <Alert severity="error">Error Loading Board Details</Alert>;
};

export default Board;
