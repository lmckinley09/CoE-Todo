import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorContiner } from './styled';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = () => {
	return (
		<EditorContiner>
			<Editor
				// editorState={editorState}
				// onEditorStateChange={setEditorState}
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				toolbarClassName="toolbarClassName"
				toolbarStyle={{ border: 'none', borderBottom: '1px solid #f1f1f1' }}
				editorStyle={{ padding: '0px 10px', color: 'rgba(0, 0, 0, 0.87)' }}
				wrapperStyle={{
					border: '1px solid #c4c4c4',
					borderRadius: '4px',
					minHeight: '250px',
				}}
				// toolbarHidden={toolbarHidden}
				// readOnly={readOnly}
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
		</EditorContiner>
	);
};

export default RichTextEditor;
