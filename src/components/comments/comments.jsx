import React, { Component } from 'react';
import Comment from '../comment/comment';
import './comments.scss';
import ReplyCommentBox from '../reply-comment-box/reply-comment-box';
class Comments extends Component {
  state = {
    showReplyBox: false,
  };
  handleShowReplyBox = () => {
    this.setState({ showReplyBox: !this.state.showReplyBox });
  };
  render() {
    const { comments, collection } = this.props;
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
          ? comments.map((comment, index) => {
              return (
                <div key={index}>
                  <Comment comment={comment} />
                  <div className="reply">
                    <span onClick={this.handleShowReplyBox}>Reply</span>
                    <span className="reply-count">
                      {comment.replies.length} Replies
                    </span>
                  </div>
                  {comment.replies.map((reply, index) => (
                    <Comment key={index} comment={reply} reply />
                  ))}
                  {this.state.showReplyBox ? (
                    <ReplyCommentBox
                      collection={collection}
                      commentId={comment.id}
                      blogName={comment.post}
                    />
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default Comments;
