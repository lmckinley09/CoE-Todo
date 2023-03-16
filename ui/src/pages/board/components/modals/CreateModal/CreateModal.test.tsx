import { screen, fireEvent } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import useCreateJob from '@hooks/integrationHooks/useCreateJob';
import CreateModal from './index';
import TestUtils from '@test-utils';
import { IGetBoards } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';
import dayjs from 'dayjs';
import { when } from 'jest-when';

jest.mock('../../../../../hooks/integrationHooks/useCreateJob');

describe('Boards page', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render boards summary page', () => {
		(useCreateJob as jest.Mock).mockReturnValue({ mutate: jest.fn() });
		TestUtils.render(<CreateModal open={true} handleClose={jest.fn()} />);

		expect(screen.getByTestId('create-job-modal')).toBeInTheDocument();
	});
});

export {};
