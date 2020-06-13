import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import ForumSubPage from '../forum-sub-page/forum-sub-page';
import TopicPage from '../topicpage/topicpage';
import { selectForumPreviewData, selectSubForumRoutes, selectSubForumTopicRoutes } from '../../redux/forum/forum.selector'
import './forum.scss'

//Components Imports here
import ForumMain from '../../components/ForumMainContent/ForumMain';
import ForumSideBar from '../../components/ForumSideBar/ForumSideBar';
class Forum extends Component {
  render() {
    // console.log(this.props.subForumTopicRoutes.forEach(item => item.forEach(item2 => console.log(item2))));
    return (
      <div className="forum main">
        <Route exact path={`${this.props.match.path}`} component={ForumMain} />
        {this.props.subForumRoutes.map((item, index) => <Route key={index}
          exact
          path={`/${item}/:forumSubCategoryId`}
          component={ForumSubPage}
        />)}
        {this.props.subForumTopicRoutes.forEach(item => item.map((item2, index) => <Route key={index}
          exact
          path={`/${item2}/:forumPostId`}
          component={TopicPage}
        />))}
        <ForumSideBar />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  forumPreviewData: selectForumPreviewData,
  subForumRoutes: selectSubForumRoutes,
  subForumTopicRoutes: selectSubForumTopicRoutes,
});
export default withRouter(connect(mapStateToProps)(Forum));
