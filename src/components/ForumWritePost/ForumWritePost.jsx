import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleEditor } from '../../redux/forum/forum.actions';
import { selectToggleEdit } from '../../redux/forum/forum.selector';
import './ForumWritePost.scss';
import Editor from '../forum-editor/forum-editor';

const ForumWritePost = ({ userName, toggleEditor, toggleEdit }) => {
  // const [state, setState] = useState({})
  const handleShowEditor = () => {
    toggleEditor(true)
  }
  toggleEdit
    ? (document.documentElement.style.overflowY = 'hidden')
    : (document.documentElement.style.overflowY = 'scroll');
  return (
    <form id='form'>
      <div id='formHeading'>
        <div id='userImg'>
          <img src='https://avatars0.githubusercontent.com/u/30846348?s=88&u=2b42c8f066c074b3183772888aba9a58ac1d50de&v=4' alt='' />
        </div>
        <h2>Welcome, {userName}</h2>
      </div>
      <input onClick={handleShowEditor} placeholder='post a new topic' />
      {toggleEdit ? <Editor /> : null}
    </form>
  )
}
const mapStateToProps = createStructuredSelector({
  toggleEdit: selectToggleEdit
});
const mapDispatchToProps = (dispatch) => ({
  toggleEditor: (isShow) => dispatch(toggleEditor(isShow)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForumWritePost);