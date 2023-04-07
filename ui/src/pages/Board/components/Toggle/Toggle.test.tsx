import { screen } from '@testing-library/react';
import Toggle from './index';
import TestUtils from '@test-utils';

describe('Toggle', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render toggle ', () => {
		TestUtils.render(
			<Toggle checked={false} id="status-toggle" onChange={jest.fn()} />
		);

		expect(screen.getByTestId('status-toggle')).toBeInTheDocument();
	});
});

export {};
