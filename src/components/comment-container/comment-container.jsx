import React, { useState } from 'react';
import Comment from '../comment/comment';
import ReplyCommentBox from '../reply-comment-box/reply-comment-box';
const CommentContainer = ({ comment, url, postId }) => {
  const [replyBox, showReplyBox] = useState(false);
  const handleShowReplyBox = () => {
    showReplyBox(!replyBox);
  };
  return (
    <div>
      <Comment comment={comment} />
      <div className="reply">
        <span onClick={handleShowReplyBox}>Reply</span>
        <span className="reply-count">{comment.replies.length} Replies</span>
      </div>
      {comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} reply />
      ))}
      {replyBox ? (
        <ReplyCommentBox commentId={comment.id} url={url} postId={postId} />
      ) : null}
    </div>
  );
};

export default CommentContainer;
