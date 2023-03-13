import React from 'react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
	Queries,
	RenderResult,
	render as rtlRender,
} from '@testing-library/react';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
	createTheme,
	CssBaseline,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const queryClient = new QueryClient();
const testTheme = createTheme();
function render(
	ui: React.ReactElement<any>,
	{ ...options } = {}
): RenderResult<Queries, HTMLElement> {
	const Wrapper: React.JSXElementConstructor<{
		children: React.ReactElement;
	}> = ({ children }) => (
		<Router>
			<MuiThemeProvider theme={testTheme}>
				<CssBaseline enableColorScheme>
					<QueryClientProvider client={queryClient}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							{children}
						</LocalizationProvider>
					</QueryClientProvider>
				</CssBaseline>
			</MuiThemeProvider>
		</Router>
	);
	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export const buildAxiosResponse = function <T>(
	data: T,
	status: number
): AxiosResponse<T> {
	const axiosResponse: AxiosResponse<T> = {
		data,
		status,
		statusText: status.toString(),
		headers: {} as AxiosResponseHeaders,
		//@ts-ignore
		config: {} as AxiosRequestConfig,
	};
	return axiosResponse;
};

const TestUtils = {
	render,
	buildAxiosResponse,
};

export default TestUtils;
