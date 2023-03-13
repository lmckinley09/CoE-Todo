import { screen } from '@testing-library/react';
import useGetBoard from '../../hooks/integrationHooks/useGetBoard';
import useGetJobs from '../../hooks/integrationHooks/useGetJobs';
import { Board } from '@pages';
import TestUtils from '@test-utils';
import { IBoard } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';

jest.mock('../../hooks/integrationHooks/useGetBoard');
jest.mock('../../hooks/integrationHooks/useGetJobs');

describe('Board page', () => {
	const mockBoardData: { data: IBoard } = {
		data: {
			id: 1,
			name: "Lorna's Board",
			created: '2023-02-07T15:58:11.689Z',
			last_modified: '2023-03-10T12:41:14.930Z',
		},
	};

	const mockJobsData: { data: IJob[] } = {
		data: [
			{
				id: 10,
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
		],
	};

	beforeEach(() => {
		(useGetBoard as jest.Mock).mockReturnValue({ data: mockBoardData });
		(useGetJobs as jest.Mock).mockReturnValue({ data: mockJobsData });
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render board title and create button', () => {
		TestUtils.render(<Board />);
		expect(screen.getByTestId('board-name')).toBeInTheDocument();
	});
});

export {};
