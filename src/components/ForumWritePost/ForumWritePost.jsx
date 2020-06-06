import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { toggleEditor } from '../../redux/forum/forum.actions';
import { selectToggleEdit } from '../../redux/forum/forum.selector';
import CustomButton from '../custom-button/custom-button'
import './ForumWritePost.scss';
import Editor from '../forum-editor/forum-editor';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const ForumWritePost = ({ currentUser, toggleEditor, toggleEdit }) => {
  const handleShowEditor = () => {
    toggleEditor(true)
  }
  toggleEdit
    ? (document.documentElement.style.overflowY = 'hidden')
    : (document.documentElement.style.overflowY = 'scroll');
  return (
    <form id='form'>
      {currentUser ? <><div id='formHeading'>
        <div id='userImg'>
          <img src='https://avatars0.githubusercontent.com/u/30846348?s=88&u=2b42c8f066c074b3183772888aba9a58ac1d50de&v=4' alt='' />
        </div>
        <h2>Welcome, {currentUser.displayName}</h2>
      </div>
        <input onClick={handleShowEditor} placeholder='post a new topic' />
        {toggleEdit ? <Editor /> : null}</> : <Link to="/signup">
          <CustomButton acen>Register</CustomButton>
        </Link>}
    </form>
  )
}
const mapStateToProps = createStructuredSelector({
  toggleEdit: selectToggleEdit,
  currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  toggleEditor: (isShow) => dispatch(toggleEditor(isShow)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForumWritePost);