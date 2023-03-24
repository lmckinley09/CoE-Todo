import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import useCreateJob from '@hooks/integrationHooks/useCreateJob';
import CreateModal from './index';
import TestUtils from '@test-utils';
import { IGetBoards } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';
import { when } from 'jest-when';

jest.mock('../../../../../hooks/integrationHooks/useCreateJob');

describe('CreateJobModal', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render create job modal', () => {
		(useCreateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('create-job-modal')).toBeInTheDocument();
	});

	it('should call useCreateJob', async () => {
		(useCreateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		const jobTypeInput = screen.getByTestId('job-type-input') as HTMLInputElement;
		const titleInput = screen.getByTestId('title-input') as HTMLInputElement;

		expect(jobTypeInput).toBeInTheDocument();
		fireEvent.change(jobTypeInput, { target: { value: 1 } });
		expect(jobTypeInput.value).toEqual('1');

		expect(titleInput).toBeInTheDocument();
		fireEvent.change(titleInput, { target: { value: 'test' } });
		expect(titleInput.value).toEqual('test');

		expect(screen.getByTestId('submit-job-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('submit-job-button'));
		await waitFor(() => expect(useCreateJob).toHaveBeenCalled());
	});

	it('should call handleClose if cancel button clicked', async () => {
		const handleClose = jest.fn();
		(useCreateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={handleClose} />);

		expect(screen.getByTestId('close-create-modal-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		await waitFor(() => expect(handleClose).toHaveBeenCalled());
	});
});

export {};
