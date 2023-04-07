import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import useCreateBoard from '@hooks/integrationHooks/useCreateBoard';
import CreateModal from './index';
import TestUtils from '@test-utils';
import { IGetBoards } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';
import { when } from 'jest-when';

jest.mock('../../../../../hooks/integrationHooks/useCreateBoard');

describe('CreateBoardModal', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render create board modal', () => {
		(useCreateBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('create-board-modal')).toBeInTheDocument();
	});

	it('should call useCreateBoard when submitted', async () => {
		(useCreateBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		const nameInput = screen.getByTestId('board-name-input') as HTMLInputElement;

		expect(nameInput).toBeInTheDocument();
		fireEvent.change(nameInput, { target: { value: 'test' } });
		expect(nameInput.value).toEqual('test');

		expect(screen.getByTestId('create-board-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('create-board-button'));
		await waitFor(() => expect(useCreateBoard).toHaveBeenCalled());
	});

	it('should call handleClose if cancel button clicked', async () => {
		const handleClose = jest.fn();
		(useCreateBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={handleClose} />);

		expect(screen.getByTestId('close-create-modal-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		await waitFor(() => expect(handleClose).toHaveBeenCalled());
	});
});

export {};
