import React, { Component } from 'react';
import './comments.scss';
import CommentContainer from '../comment-container/comment-container';
class Comments extends Component {
  render() {
    const { comments } = this.props;
    let commentLength = this.props.comments.length;
    this.props.comments.forEach((comment) => {
      commentLength = commentLength + comment.replies.length;
    });
    return (
      <div className="comments">
        <div className="head">
          <h5>{commentLength} Comments</h5>
        </div>
        {comments.length !== 0
          ? comments.map((comment, index) => (
              <CommentContainer
                key={index}
                comment={comment}
                url={this.props.url}
                postId={this.props.postId}
              />
            ))
          : null}
      </div>
    );
  }
}

export default Comments;
