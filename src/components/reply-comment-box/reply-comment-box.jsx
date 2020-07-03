import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addAReply } from '../../firebase/firebase.utils';
import { GenerateId } from '../../utils/id-generator';
import './reply-comment-box.scss';

class ReplyCommentBox extends Component {
  state = {
    reply: '',
    isLoading: false,
  };

  updateInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addReply = async (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    const { url, currentUser, commentId, postId } = this.props;
    const { reply } = this.state;
    if (reply.trim() === '') return;
    const d_ata = {
      id: GenerateId(),
      name: currentUser.displayName,
      text: reply,
      photo: currentUser.profile_pic ? currentUser.profile_pic : '',
      date: Date.now(),
    };
    await addAReply({ collection: url, d_ata, commentId, postId });
    this.setState({
      reply: '',
      isLoading: false,
    });
  };

  render() {
    const { reply } = this.state;
    const { currentUser } = this.props;
    return currentUser ? (
      <div className="reply-comment-box">
        <img
          src={currentUser.profile_pic && currentUser.profile_pic}
          alt="User Icon"
        />
        <form onSubmit={this.addReply}>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className="form-input"
                name="reply"
                value={reply}
                onChange={this.updateInput}
                placeholder="Add comment"
              />
            </div>
          </div>
        </form>
      </div>
    ) : null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ReplyCommentBox);
