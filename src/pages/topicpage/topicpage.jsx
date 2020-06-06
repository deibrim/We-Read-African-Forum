import React from 'react';
import { connect } from 'react-redux';
import './topicpage.scss';
class TopicPage extends React.Component {
  render() {
    console.log("Topic Page");

    return (
      <div className="topic-page">
        <h1 className="title">Topic Page</h1>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //   forum: selectForumTopic(
    //     ownProps.match.params.forumPostId,
    //     ownProps.match.url
    //   )(state),
  };
};

export default connect(mapStateToProps)(TopicPage);
