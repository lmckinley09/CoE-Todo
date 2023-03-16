import { screen, fireEvent } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import useCreateBoard from '@hooks/integrationHooks/useCreateBoard';
import CreateModal from './index';
import TestUtils from '@test-utils';
import { IGetBoards } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';
import { when } from 'jest-when';

jest.mock('../../../../../hooks/integrationHooks/useCreateBoard');

describe('Boards page', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render boards summary page', () => {
		(useCreateBoard as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('create-board-modal')).toBeInTheDocument();
	});
});

export {};
