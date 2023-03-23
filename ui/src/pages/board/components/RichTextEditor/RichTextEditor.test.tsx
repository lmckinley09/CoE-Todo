import { screen } from '@testing-library/react';
import RichTextEditor from './index';
import TestUtils from '@test-utils';

describe('RichTextEditor', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render rich text editor', () => {
		TestUtils.render(
			<RichTextEditor value={''} error={undefined} setFieldValue={jest.fn()} />
		);

		expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
	});
});

export {};
