import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addAComment } from '../../firebase/firebase.utils';
import { GenerateId } from '../../utils/id-generator';
import send from '../../assets/messaging/send.svg';
import loader from '../../assets/loader.gif';
import './comment-box.scss';

class CommentBox extends Component {
  state = {
    newComment: '',
    isLoading: false,
  };

  updateInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addComment = async (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    const { title, category, currentUser } = this.props;
    const { newComment } = this.state;
    if (newComment.trim() === '') return;
    const d_ata = {
      id: GenerateId(),
      name: currentUser.displayName,
      text: newComment,
      photo: currentUser.photoURL ? currentUser.photoURL : null,
      post: title.toLowerCase(),
      date: Date.now(),
      replies: [],
    };
    await addAComment({ collection: category, d_ata });
    this.setState({
      newComment: '',
      isLoading: false,
    });
  };

  render() {
    const { newComment } = this.state;
    return (
      <div className="comment-box">
        <form onSubmit={this.addComment}>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                name="newComment"
                value={newComment}
                placeholder="Reply..."
                onChange={this.updateInput}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <span
                className="post-comment"
                onClick={this.state.isLoading ? null : this.addComment}
              >
                {this.state.isLoading ? (
                  <img src={loader} alt="Loader Gif" />
                ) : (
                  <img src={send} alt="Send icon" />
                )}
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CommentBox);
