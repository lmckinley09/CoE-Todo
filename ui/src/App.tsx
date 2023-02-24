import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '@components';
import { Login, Error, SignUp } from '@pages';

const App = (): React.ReactElement => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Login />} errorElement={<Error />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</Router>
	);
};

export default App;
