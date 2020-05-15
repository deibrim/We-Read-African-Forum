import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addAComment } from '../../firebase/firebase.utils';
import { GenerateId } from '../../utils/id-generator';
import loader from '../../assets/loader.gif';
import './comment-box.scss';

class CommentBox extends Component {
  state = {
    name: this.props.currentUser ? this.props.currentUser.displayName : '',
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
    const { name, newComment } = this.state;
    if (name.trim() === '' || newComment.trim() === '') return;
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
    const { name, newComment } = this.state;
    const { currentUser } = this.props;
    return currentUser ? (
      <div className="comment-box">
        <form onSubmit={this.addComment}>
          <div className="field">
            <div className="control">
              <label>Comment</label>
              <textarea
                className="textarea"
                name="newComment"
                value={newComment}
                onChange={this.updateInput}
              ></textarea>
            </div>
          </div>
          {currentUser ? null : (
            <div className="field">
              <div className="control">
                <label>Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  value={name}
                  onChange={this.updateInput}
                />
              </div>
            </div>
          )}

          <div className="field">
            <div className="control">
              <span
                className="post-comment"
                onClick={this.state.isLoading ? null : this.addComment}
              >
                Post a Comment{' '}
                {this.state.isLoading ? (
                  <img src={loader} alt="Loader Gif" />
                ) : null}
              </span>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div className="login">
        Please <Link to="/signin">Login</Link> to comment
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CommentBox);
