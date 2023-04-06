import { fireEvent, screen, waitFor } from '@testing-library/react';
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

	it('should call useDelete on confirm', async () => {
		(useDeleteBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<ConfirmationModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('confirm-delete-button'));
		await waitFor(() => expect(useDeleteBoard).toHaveBeenCalled());
	});

	it('should call handleClose if cancel button clicked', async () => {
		(useDeleteBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		const handleClose = jest.fn();
		TestUtils.render(<ConfirmationModal open={true} handleClose={handleClose} />);

		expect(screen.getByTestId('cancel-delete-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('cancel-delete-button'));
		await waitFor(() => expect(handleClose).toHaveBeenCalled());
	});
});

export {};
