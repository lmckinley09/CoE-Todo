import { screen } from '@testing-library/react';
import useDeleteBoard from '@hooks//integrationHooks/useDeleteBoard';
import ConfirmationModal from './index';
import TestUtils from '@test-utils';

jest.mock('../../../../../hooks/integrationHooks/useDeleteBoard');

describe('ConfirmationModal', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render confirmation modal', () => {
		(useDeleteBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<ConfirmationModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('delete-confirmation-modal')).toBeInTheDocument();
		expect(screen.getByTestId('cancel-delete-button')).toBeInTheDocument();
		expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
	});
});

export {};
