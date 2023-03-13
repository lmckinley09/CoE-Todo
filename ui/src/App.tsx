import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { Layout } from '@components';
import { Board, Boards, Login } from '@pages';
import { useAuthState } from '@stores/useAuthState';
import useTokens from '@hooks/integrationHooks/useTokens';

const App = (): React.ReactElement => {
	const { isAuthorized } = useAuthState();
	const { checkLocalStorageTokens } = useTokens();

	useEffect(() => {
		checkLocalStorageTokens();
	}, []);

	const UnauthenticatedRoutes = (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
	const AuthenticatedRoutes = (
		<Layout>
			<Routes>
				<Route path="/boards" element={<Boards />} />
				<Route path="/board/:boardId" element={<Board />} />
				<Route path="*" element={<Navigate to="/boards" />} />
			</Routes>
		</Layout>
	);
	return (
		<>
			{isAuthorized && AuthenticatedRoutes}
			{isAuthorized === false && UnauthenticatedRoutes}
		</>
	);
};

export default App;
