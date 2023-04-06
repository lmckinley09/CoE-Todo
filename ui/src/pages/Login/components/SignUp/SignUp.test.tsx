import { screen, fireEvent, waitFor } from '@testing-library/react';
import useCreateUser from '@hooks/integrationHooks/useCreateUser';
import SignUp from './index';
import TestUtils from '@test-utils';

jest.mock('../../../../hooks/integrationHooks/useCreateUser');

describe('SignUp', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render sign up', () => {
		(useCreateUser as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(
			<SignUp setToggleSignUp={jest.fn()} setNewUserEmail={jest.fn()} />
		);

		expect(screen.getByTestId('sign-up-panel')).toBeInTheDocument();
	});

	it('submit form when sign in button clicked', async () => {
		(useCreateUser as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(
			<SignUp setToggleSignUp={jest.fn()} setNewUserEmail={jest.fn()} />
		);

		const signupButton = screen.getByTestId('signup-button') as HTMLInputElement;
		const fnameInput = screen.getByTestId('first-name-input') as HTMLInputElement;
		const lnameInput = screen.getByTestId('last-name-input') as HTMLInputElement;
		const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			'password-input'
		) as HTMLInputElement;

		fireEvent.change(fnameInput, {
			target: { value: 'fname' },
		});
		expect(fnameInput.value).toEqual('fname');

		fireEvent.change(lnameInput, {
			target: { value: 'lname' },
		});
		expect(lnameInput.value).toEqual('lname');

		fireEvent.change(emailInput, {
			target: { value: 'email@mail.com' },
		});
		expect(emailInput.value).toEqual('email@mail.com');
		fireEvent.change(passwordInput, {
			target: { value: 'password1!' },
		});
		expect(passwordInput.value).toEqual('password1!');
		fireEvent.click(signupButton);

		await waitFor(() => expect(useCreateUser).toHaveBeenCalled());
	});

	it('should call setToggleSignUp if presses login button', async () => {
		(useCreateUser as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		const toggleSignUp = jest.fn();
		TestUtils.render(
			<SignUp setToggleSignUp={toggleSignUp} setNewUserEmail={jest.fn()} />
		);
		fireEvent.click(screen.getByTestId('toggle-login-button'));
		await waitFor(() => expect(toggleSignUp).toHaveBeenCalled());
	});
});

export {};
