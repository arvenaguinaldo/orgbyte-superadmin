// import React from 'react';
// import {compose, withHandlers, withState, withPropsOnChange} from 'recompose';
// import {FormFeedback} from 'reactstrap';
// import {EditorState, ContentState, convertToRaw} from 'draft-js';
// import htmlToDraft from 'html-to-draftjs';
// import draftToHtml from 'draftjs-to-html';
// import {Editor} from 'react-draft-wysiwyg';

// import './WysiwygEditor.scss';

// const WysiwygEditor =
//   (
//     {
//       input, // eslint-disable-line react/prop-types
//       meta: {touched, error}, // eslint-disable-line react/prop-types
//       editorState, // eslint-disable-line react/prop-types
//       onEditorStateChange // eslint-disable-line react/prop-types
//     }
//   ) => (
//     <div className="WysiwygEditor">
//       {
//         editorState &&
//         <Editor
//           editorState={editorState}
//           onEditorStateChange={onEditorStateChange}
//           editorClassName="editor"
//           toolbarClassName="toolbar"
//         />
//       }
//       {touched && error && <FormFeedback>{error}</FormFeedback>}
//     </div>
//   );

// export default compose(
//   withState('editorState', 'setEditorState', EditorState.createEmpty()),
//   withPropsOnChange(
//     ['input'],
//     ({input: {value}, meta: {dirty}, setEditorState}) => {
//       if (dirty) {
//         return;
//       }
//       if (!value) {
//         return;
//       }
//       const contentBlock = htmlToDraft(value);
//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       setEditorState(editorState);
//     }
//   ),
//   withHandlers({
//     onEditorStateChange: ({input: {onChange}, setEditorState}) => (editorState) => {
//       setEditorState(editorState);
//       const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//       onChange(html);
//     }
//   })
// )(WysiwygEditor);
