import { screen, fireEvent } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import useGetBoards from '../../hooks/integrationHooks/useGetBoards';
import { Boards } from '@pages';
import TestUtils from '@test-utils';
import { IGetBoards } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';
import { when } from 'jest-when';

jest.mock('../../hooks/integrationHooks/useGetBoards');

describe('Boards page', () => {
	const mockBoardsData: { data: IGetBoards } = {
		data: {
			owner: [
				{
					id: 1,
					name: 'To Do List',
					created: '2023-03-08T16:20:54.459Z',
					lastModified: '2023-03-10T14:10:21.519Z',
					tickCount: 1,
					taskCount: 1,
					projectCount: 1,
				},
			],
			shared: [
				{
					id: 2,
					name: 'New Board',
					created: '2023-02-28T10:53:15.324Z',
					lastModified: '2023-02-28T10:53:15.324Z',
					tickCount: 0,
					taskCount: 2,
					projectCount: 1,
				},
			],
		},
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render boards summary page', () => {
		(useGetBoards as jest.Mock).mockReturnValue({ data: mockBoardsData });
		TestUtils.render(<Boards />);

		expect(screen.getByTestId('owner-boards-header')).toBeInTheDocument();
		expect(screen.getByTestId('shared-boards-header')).toBeInTheDocument();

		expect(screen.getByTestId('board-item-1')).toBeInTheDocument();
		expect(screen.getByTestId('board-item-2')).toBeInTheDocument();

		expect(screen.getByTestId('project-count-board-1')).toBeInTheDocument();
		expect(screen.getByTestId('task-count-board-1')).toBeInTheDocument();
		expect(screen.getByTestId('tick-count-board-1')).toBeInTheDocument();
	});

	it('should render create modal when add button clicked', async () => {
		(useGetBoards as jest.Mock).mockReturnValue({ data: mockBoardsData });
		TestUtils.render(<Boards />);

		const addBoard = screen.getByTestId('add-board-button');

		expect(screen.queryByTestId('create-board-modal')).not.toBeInTheDocument();
		fireEvent.click(addBoard);
		expect(screen.getByTestId('create-board-modal')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('close-create-modal-button'));
		expect(screen.queryByTestId('create-board-modal')).not.toBeInTheDocument();
	});

	it('should render loader when boards loading', async () => {
		(useGetBoards as jest.Mock).mockReturnValue({ isLoading: true });
		TestUtils.render(<Boards />);
		expect(screen.getAllByTestId('boards-loader')).toHaveLength(2);
	});
});

export {};
