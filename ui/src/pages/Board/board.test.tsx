import { screen, fireEvent } from '@testing-library/react';
import useGetBoard from '../../hooks/integrationHooks/useGetBoard';
import useGetJobs from '../../hooks/integrationHooks/useGetJobs';
// import useCreateJob from '@hooks/integrationHooks/useCreateJob';
// import useUpdateJob from '@hooks/integrationHooks/useUpdateJob';
import { Board } from '@pages';
import TestUtils from '@test-utils';
import { IBoard } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';

jest.mock('../../hooks/integrationHooks/useGetBoard');
jest.mock('../../hooks/integrationHooks/useGetJobs');
// jest.mock('../../hooks/integrationHooks/useCreateJob');
// jest.mock('react-router-dom');

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		boardId: 1,
	}),
	useRouteMatch: () => ({ url: '/board/1' }),
}));

describe('Board page', () => {
	const mockBoardData: { data: IBoard } = {
		data: {
			id: 1,
			name: "Lorna's Board",
			created: '2023-02-07T15:58:11.689Z',
			lastModified: '2023-03-10T12:41:14.930Z',
		},
	};

	const mockJobsData: { data: IJob[] } = {
		data: [
			{
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
			},
			{
				id: 2,
				boardId: 1,
				typeId: 2,
				title: 'test2',
				description: '<p>test2</p>',
				status: 'Done',
				completionDate: '2023-02-27T00:00:00.000Z',
				lastModified: '2023-03-02T10:53:23.663Z',
				created: '2023-02-27T18:33:18.476Z',
				jobType: { id: 2, description: 'task' },
			},
		],
	};

	const getAllBoardData = () => {
		(useGetBoard as jest.Mock).mockReturnValue({ data: mockBoardData });
		(useGetJobs as jest.Mock).mockReturnValue({ data: mockJobsData });
		// (useCreateJob as jest.Mock).mockReturnValue({ mutate: mutate });
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render board title and function buttons', () => {
		getAllBoardData();
		TestUtils.render(<Board />);
		expect(screen.getByTestId('board-name')).toBeInTheDocument();
		expect(screen.getByTestId('edit-board-name-button')).toBeInTheDocument();
		expect(screen.getByTestId('delete-board-button')).toBeInTheDocument();
		expect(screen.getByTestId('toggle-done-view')).toBeInTheDocument();

		expect(screen.getByTestId('add-quick-tick-button')).toBeInTheDocument();
		expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
		expect(screen.getByTestId('add-project-button')).toBeInTheDocument();
	});

	it('should render alert if no board data', async () => {
		(useGetBoard as jest.Mock).mockReturnValue({ error: 'No Data' });
		TestUtils.render(<Board />);
		expect(screen.getByTestId('board-error-alert')).toBeInTheDocument();
	});

	it('should render alerts if no job data', async () => {
		(useGetBoard as jest.Mock).mockReturnValue({ data: mockBoardData });
		(useGetJobs as jest.Mock).mockReturnValue({ error: 'No Data' });
		TestUtils.render(<Board />);
		expect(screen.getAllByTestId('jobs-error-alert')).toHaveLength(3);
	});

	it('should not render done jobs when toggle is false', async () => {
		getAllBoardData();
		TestUtils.render(<Board />);
		const toggleSwitch = screen.getByTestId('toggle-done-view');

		expect(screen.getByTestId('job-tick-1')).toBeInTheDocument();
		expect(screen.getByTestId('job-task-2')).toBeInTheDocument();

		fireEvent.click(toggleSwitch);

		expect(screen.getByTestId('job-tick-1')).toBeInTheDocument();
		expect(screen.queryByTestId('job-task-2')).not.toBeInTheDocument();
	});

	it('should render loader when jobs loading', async () => {
		(useGetBoard as jest.Mock).mockReturnValue({ data: mockBoardData });
		(useGetJobs as jest.Mock).mockReturnValue({ isLoading: true });
		TestUtils.render(<Board />);
		expect(screen.getAllByTestId('job-loader')).toHaveLength(3);
	});

	it('should render input when editing board name', async () => {
		getAllBoardData();
		TestUtils.render(<Board />);

		expect(screen.queryByTestId('board-name-input')).not.toBeInTheDocument();
		const editButton = screen.getByTestId('edit-board-name-button');
		expect(editButton).toBeInTheDocument();

		fireEvent.click(editButton);

		expect(screen.getByTestId('board-name-input')).toBeInTheDocument();
		expect(screen.getByTestId('submit-board-name-button')).toBeInTheDocument();
	});

	it('should render create modal when add button clicked', async () => {
		getAllBoardData();
		TestUtils.render(<Board />);

		expect(screen.queryByTestId('create-job-modal')).not.toBeInTheDocument();
		fireEvent.click(screen.getByTestId('add-quick-tick-button'));
		expect(screen.getByTestId('create-job-modal')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		expect(screen.queryByTestId('create-job-modal')).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId('add-task-button'));
		expect(screen.getByTestId('create-job-modal')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		expect(screen.queryByTestId('create-job-modal')).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId('add-project-button'));
		expect(screen.getByTestId('create-job-modal')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		expect(screen.queryByTestId('create-job-modal')).not.toBeInTheDocument();
	});

	// it('should call useCreateJob hook onSubmit', async () => {
	// 	getAllBoardData();
	// 	TestUtils.render(<Board />);
	// 	const addTick = screen.getByTestId('add-quick-tick-button');
	// 	fireEvent.click(addTick);
	// 	const submit = screen.getByTestId('submit-job-button');
	// 	fireEvent.click(submit);
	// 	await waitFor(() => expect(mutate).toHaveBeenCalled());
	// });

	it('should render edit modal when job name clicked', async () => {
		getAllBoardData();
		TestUtils.render(<Board />);

		expect(screen.queryByTestId('edit-job-modal-1')).not.toBeInTheDocument();
		expect(screen.getByTestId('job-tick-1')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('job-tick-1'));
		expect(screen.getByTestId('edit-job-modal-1')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('close-edit-modal-button'));
		expect(screen.queryByTestId('edit-job-modal-1')).not.toBeInTheDocument();
	});

	it('should render confirmation modal when delete button clicked', async () => {
		getAllBoardData();
		TestUtils.render(<Board />);

		const deleteButton = screen.getByTestId('delete-board-button');
		const confirmModal = 'delete-confirmation-modal';
		expect(screen.queryByTestId(confirmModal)).not.toBeInTheDocument();
		fireEvent.click(deleteButton);
		expect(screen.getByTestId(confirmModal)).toBeInTheDocument();
		expect(screen.getByTestId('cancel-delete-button')).toBeInTheDocument();
		expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('cancel-delete-button'));
		expect(screen.queryByTestId(confirmModal)).not.toBeInTheDocument();
	});
});

export {};
