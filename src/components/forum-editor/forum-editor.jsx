import React from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleEditor } from '../../redux/forum/forum.actions';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins';
import image from 'suneditor/src/plugins/dialog/link';
import FormSelect from '../form-select/form-select';
import { sendNewTopicToDatabase } from '../../firebase/firebase.utils';
import { GenerateId } from '../../utils/id-generator';
import loader from '../../assets/loader.gif';
import 'suneditor/dist/css/suneditor.min.css';
import './forum-editor.scss';
class Editor extends React.Component {
  state = {
    forum_name_arr_obj: [],
    forum_names: [],
    sub_forum_names: [],
    forum: '',
    subForum: '',
    title: '',
    body: '',
    isLoading: false,
    errorMessage: '',
  };
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'forum') {
      const smt = this.state.forum_name_arr_obj.filter(
        (item, index) => item.name.toLowerCase() === value
      );
      this.setState({ sub_forum_names: smt[0].sub_forum });
    }
    this.setState({ [name]: value }, () => {});
  };
  handleChange = (content) => {
    this.setState({ body: content });
  };

  handlePostTopic = async () => {
    const { forum, subForum, title, body } = this.state;
    if (forum === '' || subForum === '' || title === '' || body === '') {
      this.setState({ errorMessage: 'All fields is required' });
      return;
    }
    this.setState({ isLoading: !this.state.isLoading });
    const newTopic = {
      forum,
      subForum,
      title: title,
      body,
      id: GenerateId(),
      user: this.props.currentUser,
      posted_at: Date.now(),
      likes: 0,
      likers: [],
    };
    // console.log(newTopic);

    await sendNewTopicToDatabase(newTopic);
    this.setState({ isLoading: !this.setState.isLoading });
    this.props.toggleEditor();
  };
  componentDidMount() {
    const forumNamesRef = firestore.collection('forum_names');
    forumNamesRef.onSnapshot(async (snapshot) => {
      const forumNameArrObj = [],
        forumNames = [];
      snapshot.docs.forEach((doc) => {
        forumNameArrObj.push(doc.data());
        forumNames.push(doc.data().name);
      });
      this.setState({
        forum_name_arr_obj: forumNameArrObj,
        forum_names: forumNames,
      });
    });
  }
  render() {
    const { forum, subForum, title, errorMessage } = this.state;
    return (
      <div className="bg">
        {errorMessage !== '' ? (
          <span className="error">{errorMessage}</span>
        ) : null}
        <div className="forum-editor">
          <h4>Post a Topic</h4>
          <div className="group-inputg">
            <label>
              Select Forum <span className="required">required</span>
            </label>
            <FormSelect
              name="forum"
              value={forum}
              required
              handleChange={this.handleChangeInput}
              options={
                this.state.forum_names.length !== 0
                  ? [...this.state.forum_names]
                  : []
              }
            />
          </div>
          <div className="group-inputg">
            <label>
              Select Sub-Forum <span className="required">required</span>
            </label>
            <FormSelect
              name="subForum"
              value={subForum}
              required
              handleChange={this.handleChangeInput}
              options={
                this.state.sub_forum_names.length !== 0
                  ? [...this.state.sub_forum_names]
                  : []
              }
            />
          </div>
          <div className="group-inputg">
            <label>
              Title <span className="required">required</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={title}
              className="form-inputg"
              onChange={this.handleChangeInput}
            />
          </div>

          <label>
            Body <span className="required">required</span>
          </label>
          <SunEditor
            onChange={this.handleChange}
            enableToolbar={true}
            showToolbar={true}
            image={image}
            placeholder="Add comment"
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
                ['image'],
              ],
            }}
          />
          <div className="forum-editor-footer">
            <span
              className="cancel-btn btn"
              onClick={() => this.props.toggleEditor()}
            >
              Cancel
            </span>
            <span className="post-topic-btn btn" onClick={this.handlePostTopic}>
              Post Topic{' '}
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
const mapDispatchToProps = (dispatch) => ({
  toggleEditor: (isShow) => dispatch(toggleEditor(isShow)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
