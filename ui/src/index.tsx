import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
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
					<App />
				</QueryClientProvider>
			</SCThemeProvider>
		</MuiThemeProvider>
	</React.StrictMode>
);
