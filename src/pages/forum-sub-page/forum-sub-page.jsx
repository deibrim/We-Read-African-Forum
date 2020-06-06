import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { selectForumFilteredTopic } from '../../redux/forum/forum.selector';
import './forum-sub-page.scss';

const ForumSubPage = () => {
  console.log('Sub Page');

  return (
    <div className="tag-page">
      <h1>Sub Page</h1>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // forums: selectForumFilteredTopic(
    //   ownProps.match.params.forumSubCategoryId,
    //   ownProps.match.url
    // )(state),
  };
};

export default withRouter(connect(mapStateToProps)(ForumSubPage));
