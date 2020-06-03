import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleEditor } from '../../redux/forum/forum.actions';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins';
import image from 'suneditor/src/plugins/dialog/link';
import FormSelect from '../form-select/form-select'
import { sendNewTopicToDatabase } from '../../firebase/firebase.utils';
import { GenerateId } from '../../utils/id-generator';
import loader from '../../assets/loader.gif';
import 'suneditor/dist/css/suneditor.min.css';
import './forum-editor.scss';
class Editor extends React.Component {
  state = {
    forum: '',
    subForum: '',
    title: '',
    body: '',
    isLoading: false,
  }
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => { });
  };
  handleChange = (content) => {
    this.setState({ body: content });
  }
  handlePostTopic = async () => {
    this.setState({ isLoading: !this.state.isLoading });
    const newTopic = {
      title: this.state.title,
      body: this.state.body,
      id: GenerateId(),
      tag: 'blank',
      user: this.props.currentUser,
      posted_at: Date.now(),
    };
    await sendNewTopicToDatabase(newTopic);
    this.setState({ isLoading: !this.setState.isLoading });
    this.props.toggleEditor();
  };
  render() {
    const { forum, subForum, title } = this.state
    return (
      <div className="bg">
        <div className="forum-editor">
          <h4>Post a Topic</h4>
          <div className="group-inputg">
            <label>
              Select Forum <span className="required">required</span>
            </label>
            <FormSelect
              name="forum"
              value={forum}
              handleChange={this.handleChangeInput}
              options={[]}
            />
          </div>
          <div className="group-inputg">
            <label>
              Select Sub-Forum <span className="required">required</span>
            </label>
            <FormSelect
              name="subForum"
              value={subForum}
              handleChange={this.handleChangeInput}
              options={[]}
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
