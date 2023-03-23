import { screen } from '@testing-library/react';
import useUpdateJob from '@hooks//integrationHooks/useUpdateJob';
import BoardItem from './index';
import TestUtils from '@test-utils';
import { IBoard } from '@interfaces/boards';

jest.mock('../../../../hooks/integrationHooks/useUpdateJob');

describe('BoardItem', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	const board: IBoard = {
		id: 1,
		name: 'board name',
		created: '2023-02-27T00:00:00.000Z',
		lastModified: '2023-02-27T00:00:00.000Z',
		tickCount: 3,
		taskCount: 2,
		projectCount: 1,
	};

	it('should render board item', () => {
		(useUpdateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<BoardItem board={board} />);

		expect(screen.getByTestId('board-item-1')).toBeInTheDocument();
		expect(screen.getByTestId('project-count-board-1')).toBeInTheDocument();
		expect(screen.getByTestId('task-count-board-1')).toBeInTheDocument();
		expect(screen.getByTestId('tick-count-board-1')).toBeInTheDocument();
	});
});

export {};
