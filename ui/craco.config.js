import CracoAlias from 'craco-alias';

export const plugins = [
	{
		plugin: CracoAlias,
		options: {
			baseUrl: './src',
			source: 'tsconfig',
			tsConfigPath: './tsconfig.paths.json',
		},
	},
];
