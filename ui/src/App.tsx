import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '@components';
import { Board, Boards, Login, Error } from '@pages';
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
			<Route path="/login" element={<Login />} errorElement={<Error />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
	const AuthenticatedRoutes = (
		<Layout>
			<Routes>
				<Route path="/boards" element={<Boards />} errorElement={<Error />} />
				<Route path="/board" element={<Board />} />
				<Route path="*" element={<Navigate to="/boards" />} />
			</Routes>
		</Layout>
	);

	return (
		<Router>{isAuthorized ? AuthenticatedRoutes : UnauthenticatedRoutes}</Router>
	);
};

export default App;
