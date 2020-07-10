import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import {
  updateTopicsAdmin,
  updateForumNamesAdmin,
} from '../../firebase/firebase.utils';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins';
import loader from '../../assets/loader.gif';
import 'suneditor/dist/css/suneditor.min.css';
import './admin.scss';
const Admin = () => {
  const [forumText, setForumText] = useState('');
  const [forumTextSubForum, setForumTextSubForum] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (content) => {
    setDescriptionText(content);
  };
  const addForumTopic = () => {
    //   setIsLoading(true);
    //   updateTopicsAdmin({
    //     path: forumText,
    //     id: forumTextSubForum,
    //     description: renderHTML(descriptionText).props.children[0],
    //   });
    updateForumNamesAdmin();
    setIsLoading(false);
  };
  return (
    <div className="admin">
      <div className="form-container">
        <div className="admin-group-input">
          <label>
            Forum Name <span className="required">required</span>
          </label>
          <input
            type="text"
            name="forum"
            required
            className="admin-form-input"
            onChange={(e) => setForumText(e.target.value)}
          />
        </div>
        <div className="admin-group-input">
          <label>
            Sub Forum Name <span className="required">required</span>
          </label>
          <input
            type="text"
            name="forum"
            required
            className="admin-form-input"
            onChange={(e) => setForumTextSubForum(e.target.value)}
          />
        </div>

        <label>
          Description <span className="required">required</span>
        </label>
        <SunEditor
          onChange={handleChange}
          enableToolbar={true}
          showToolbar={true}
          show={true}
          enable={true}
          setOptions={{
            height: 100,
            plugins: plugins,
            buttonList: [],
          }}
        />
        <div className="admin-editor-footer">
          <span className="admin-post-topic-btn" onClick={addForumTopic}>
            Post Topic{' '}
            {isLoading ? <img src={loader} alt="loader gif" /> : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Admin;
