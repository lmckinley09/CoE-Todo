import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<SCThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Router>
							<App />
						</Router>
					</LocalizationProvider>
				</QueryClientProvider>
			</SCThemeProvider>
		</MuiThemeProvider>
	</React.StrictMode>
);
