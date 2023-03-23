import { screen, fireEvent } from '@testing-library/react';
import useAuth from '@hooks//integrationHooks/useAuth';
import useTokens from '@hooks//integrationHooks/useTokens';
import Login from './index';
import TestUtils from '@test-utils';

jest.mock('../../hooks/integrationHooks/useAuth');
jest.mock('../../hooks/integrationHooks/useTokens');

describe('Login', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render login', () => {
		(useAuth as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		(useTokens as jest.Mock).mockReturnValue({
			checkIfValidToken: jest.fn(() => true),
		});
		TestUtils.render(<Login />);

		expect(screen.getByTestId('login-panel')).toBeInTheDocument();
	});

	it('should render sign up when toggled', () => {
		(useAuth as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		(useTokens as jest.Mock).mockReturnValue({
			checkIfValidToken: jest.fn(() => true),
		});
		TestUtils.render(<Login />);
		expect(screen.queryByTestId('sign-up-panel')).not.toBeInTheDocument();
		expect(screen.getByTestId('sign-up-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('sign-up-button'));
		expect(screen.getByTestId('sign-up-panel')).toBeInTheDocument();
	});
});

export {};
