import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectForumPreviewData } from '../../redux/forum/forum.selector'
import './ForumMain.scss';

//Components 
import ForumWritePost from '../ForumWritePost/ForumWritePost';
import Categories from '../Categories/Categories';

const ForumMain = ({ forumPreviewData }) => {
  return (
    <div id='forumMain'>
      < ForumWritePost />
      {forumPreviewData.map((item, index) => <Categories key={index} data={item} />)}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  forumPreviewData: selectForumPreviewData
});
// const mapDispatchToProps = (dispatch) => ({
//     setMembers: (members) => dispatch(setMembers(members)),
// });

export default connect(mapStateToProps)(ForumMain);
