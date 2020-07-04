import React from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import renderHTML from 'react-render-html';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins';
import image from 'suneditor/src/plugins/dialog/link';
import loader from '../../assets/loader.gif';
import 'suneditor/dist/css/suneditor.min.css';
import './edit-post.scss';
class EditPost extends React.Component {
  state = {
    body: '',
    isLoading: false,
    errorMessage: '',
  };

  handleChange = (content) => {
    this.setState({ body: content });
  };

  handleEditPost = async () => {
    const postRef = await firestore
      .collection('forums')
      .doc(`${this.props.url.split('/')[1]}`)
      .collection(`${this.props.url.split('/')[2]}`)
      .doc(`${this.props.postId}`);
    const snapShot = await postRef.get();
    if (snapShot.exists) {
      try {
        await postRef.update({ body: this.state.body });
      } catch (error) {
        console.log('An error occure while editing post', error.message);
      }
    }
    this.setState({ isLoading: !this.setState.isLoading });
    this.props.toggleEditPostBox(false);
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="bg">
        {errorMessage !== '' ? (
          <span className="error">{errorMessage}</span>
        ) : null}
        <div className="post-editor">
          <h4>Edit Post</h4>
          <SunEditor
            setContents={this.props.body}
            onChange={this.handleChange}
            enableToolbar={true}
            showToolbar={true}
            show={true}
            enable={true}
            setOptions={{
              height: 100,
              plugins: plugins,
              buttonList: [
                ['bold', 'italic'],
                ['list'],
                ['link'],
                ['blockquote'],
                ['codeView'],
              ],
            }}
          />
          <div className="post-editor-footer">
            <span
              className="cancel-btn btn"
              onClick={() => this.props.toggleEditPostBox(false)}
            >
              Cancel
            </span>
            <span className="post-topic-btn btn" onClick={this.handleEditPost}>
              Update Post{' '}
              {this.state.isLoading ? (
                <img src={loader} alt="loader gif" />
              ) : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(EditPost);
