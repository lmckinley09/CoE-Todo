import { screen, fireEvent, waitFor } from '@testing-library/react';
import useAuth from '@hooks//integrationHooks/useAuth';
import useTokens from '@hooks//integrationHooks/useTokens';
import Login from './index';
import TestUtils from '@test-utils';

jest.mock('../../hooks/integrationHooks/useAuth');
jest.mock('../../hooks/integrationHooks/useTokens');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUsedNavigate,
}));

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

	it('submit form when sign in button clicked', async () => {
		(useAuth as jest.Mock).mockReturnValue({
			mutate: jest.fn().mockResolvedValue({ status: 200 }),
		});
		(useTokens as jest.Mock).mockReturnValue({
			checkIfValidToken: jest.fn(() => true),
		});
		TestUtils.render(<Login />);

		const loginButton = screen.getByTestId('login-button') as HTMLInputElement;
		const emailInput = screen.getByTestId(
			'email-login-input'
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			'password-login-input'
		) as HTMLInputElement;

		fireEvent.change(emailInput, {
			target: { value: 'email@mail.com' },
		});
		expect(emailInput.value).toEqual('email@mail.com');
		fireEvent.change(passwordInput, {
			target: { value: 'password1!' },
		});
		expect(passwordInput.value).toEqual('password1!');
		fireEvent.click(loginButton);

		await waitFor(() => expect(useAuth).toHaveBeenCalled());
	});
});

export {};
