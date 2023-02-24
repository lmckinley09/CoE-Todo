import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '@components';
import { Login, Error, SignUp } from '@pages';
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
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
	const AuthenticatedRoutes = (
		<Routes>
			<Route path="/boards" element={<SignUp />} errorElement={<Error />} />
			{/* <Route path="/board" element={<SignUp />} errorElement={<Error />} /> */}
			<Route path="*" element={<Navigate to="/boards" />} />
		</Routes>
	);

	return (
		<Router>
			<Layout>{isAuthorized ? AuthenticatedRoutes : UnauthenticatedRoutes}</Layout>
		</Router>
	);
};

export default App;
