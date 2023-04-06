import { fireEvent, screen, waitFor } from '@testing-library/react';
import useUpdateJob from '@hooks/integrationHooks/useUpdateJob';
import EditJobModal from './index';
import TestUtils from '@test-utils';
import { IJob } from '@interfaces/jobs';

jest.mock('../../../../../hooks/integrationHooks/useUpdateJob');

describe('EditJobModal', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	const job: IJob = {
		id: 1,
		boardId: 1,
		typeId: 1,
		title: 'test',
		description: '<p>test</p>',
		status: 'Not Started',
		completionDate: '2023-02-27T00:00:00.000Z',
		lastModified: '2023-03-02T10:53:23.663Z',
		created: '2023-02-27T18:33:18.476Z',
		jobType: { id: 1, description: 'tick' },
	};

	const setDisplayFnc = jest.fn();

	it('should render edit job modal', () => {
		(useUpdateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(
			<EditJobModal
				setDisplayNotification={setDisplayFnc}
				job={job}
				open={true}
				handleClose={jest.fn()}
			/>
		);

		expect(screen.getByTestId('edit-job-modal-1')).toBeInTheDocument();
		expect(screen.getByTestId('toggle-edit-button')).toBeInTheDocument();
		expect(screen.getByTestId('close-edit-modal-button')).toBeInTheDocument();
	});

	it('should toggle to edit mode and change details', async () => {
		(useUpdateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(
			<EditJobModal
				setDisplayNotification={setDisplayFnc}
				job={job}
				open={true}
				handleClose={jest.fn()}
			/>
		);

		expect(screen.getByTestId('toggle-edit-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('toggle-edit-button'));

		const jobTypeInput = screen.getByTestId('job-type-input') as HTMLInputElement;

		const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
		const statusInput = screen.getByTestId('status-input') as HTMLInputElement;

		expect(jobTypeInput).toBeInTheDocument();
		fireEvent.change(jobTypeInput, { target: { value: 1 } });
		expect(jobTypeInput.value).toEqual('1');

		expect(titleInput).toBeInTheDocument();
		fireEvent.change(titleInput, { target: { value: 'test' } });
		expect(titleInput.value).toEqual('test');

		expect(statusInput).toBeInTheDocument();
		fireEvent.change(statusInput, { target: { value: 'Done' } });
		expect(statusInput.value).toEqual('Done');

		expect(screen.getByTestId('submit-job-button')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('submit-job-button'));
		await waitFor(() => expect(useUpdateJob).toHaveBeenCalled());
	});
});

export {};
