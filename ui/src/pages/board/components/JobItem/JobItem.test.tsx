import { fireEvent, screen, waitFor } from '@testing-library/react';
import useUpdateJob from '@hooks//integrationHooks/useUpdateJob';
import JobItem from './index';
import TestUtils from '@test-utils';
import { IJob } from '@interfaces/jobs';

jest.mock('../../../../hooks/integrationHooks/useUpdateJob');

describe('JobItem', () => {
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

	it('should render job item', () => {
		(useUpdateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<JobItem openEditModal={jest.fn()} job={job} />);

		expect(screen.getByTestId('job-tick-1')).toBeInTheDocument();
		expect(screen.getByTestId('job-status-checkbox-tick-1')).toBeInTheDocument();
	});

	it('toggle checkbox should change status', async () => {
		(useUpdateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<JobItem openEditModal={jest.fn()} job={job} />);

		expect(screen.getByTestId('job-status-checkbox-tick-1')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('job-status-checkbox-tick-1'));
		await waitFor(() => expect(useUpdateJob).toHaveBeenCalled());
	});
});

export {};
