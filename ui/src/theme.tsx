import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#df9a5f',
			contrastText: '#593313',
			light: '#e5ae7f',
			dark: '#9c6b42',
		},
		secondary: {
			main: '#804a1c',
			contrastText: '#E5AE7F',
			light: '#996e49',
			dark: '#593313',
		},
		background: {
			default: '#fffcf9',
			paper: '#ffffff',
		},
		error: {
			main: '#f56b61',
			light: '#f78880',
			dark: '#ab4a43',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#ffda6b',
			light: '#ffe188',
			dark: '#b2984a',
		},
		success: {
			main: '#a2d49f',
		},
		info: {
			main: '#f4cfb7',
			contrastText: '#804a1c',
			light: '#f6d8c5',
			dark: '#aa9080',
		},
		divider: '#804a1c',
	},
	typography: {
		allVariants: {
			color: '#804a1c',
		},
	},
});

export default theme;
