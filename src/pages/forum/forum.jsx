import React, { Component } from 'react';
import './forum.scss'

//Components Imports here
import ForumMain from '../../components/ForumMainContent/ForumMain';
import ForumSideBar from '../../components/ForumSideBar/ForumSideBar';
class Forum extends Component {
  render() {
    return (
      <div className="forum">
        <ForumMain />
        <ForumSideBar />
      </div>
    );
  }
}

export default Forum;
