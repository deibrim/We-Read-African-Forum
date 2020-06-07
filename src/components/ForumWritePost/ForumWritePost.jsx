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

import avatar from '../../assets/userIco.svg';

const ForumWritePost = ({ currentUser, toggleEditor, toggleEdit }) => {
  console.log(currentUser);
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
          <img src={avatar} alt='' />
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