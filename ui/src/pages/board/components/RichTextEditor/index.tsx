import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorContiner } from './styled';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IRichTextEditor {
	value: string;
	error: string | undefined;
	setFieldValue: (val: string) => void;
	toolbarHidden?: boolean;
	readOnly?: boolean;
}

const RichTextEditor = (props: IRichTextEditor) => {
	const { value, error, toolbarHidden, readOnly, setFieldValue } = props;

	const prepareDraft = (value: string) => {
		const draft = htmlToDraft(value);
		const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);
		return editorState;
	};

	const [editorState, setEditorState] = useState(
		value ? prepareDraft(value) : EditorState.createEmpty()
	);

	const onEditorStateChange = (editorState: EditorState) => {
		const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		setFieldValue(forFormik);
		setEditorState(editorState);
	};

	return (
		<EditorContiner>
			<Editor
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				toolbarHidden={toolbarHidden}
				readOnly={readOnly}
				toolbarStyle={{ border: 'none', borderBottom: '1px solid #f1f1f1' }}
				editorStyle={{ padding: '0px 10px', color: 'rgba(0, 0, 0, 0.87)' }}
				wrapperStyle={{
					border: '1px solid #c4c4c4',
					borderRadius: '4px',
					minHeight: '250px',
				}}
				toolbar={{
					options: ['inline', 'blockType', 'list', 'textAlign'],
					inline: {
						options: [
							'bold',
							'italic',
							'underline',
							'strikethrough',
							'superscript',
							'subscript',
						],
					},
					blockType: {
						inDropdown: true,
						options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
					},
				}}
			/>
			{error && (
				<Alert severity="error" sx={{ mt: '10px' }}>
					{error}
				</Alert>
			)}
		</EditorContiner>
	);
};

export default RichTextEditor;
