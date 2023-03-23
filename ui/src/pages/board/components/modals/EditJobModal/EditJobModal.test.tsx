import { screen } from '@testing-library/react';
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
	});
});

export {};
