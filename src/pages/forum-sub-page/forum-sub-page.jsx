import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { selectForumFilteredTopic } from '../../redux/forum/forum.selector';
import './forum-sub-page.scss';

const ForumSubPage = ({ match }) => {
  console.log(match.params.forumSubCategoryId);
  console.log(match.url);

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
