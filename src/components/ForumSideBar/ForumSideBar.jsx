import React from 'react';
import './ForumSideBar.scss';


//Components
import ForumSearch from '../ForumSearch/ForumSearch';
import SideBarRecentPosts from 
  '../SideBarRecentPosts/SideBarRecentPosts';
import Divider from '../Divider/Divider';
import SideBarTopics from '../SideBarTopics/SideBarTopics';

const ForumSideBar = () => {

  const handleSearchSubmit = (e) => { 
    e.preventDefault();
  }
  return (
    <div id='forumsidebar'>
      <ForumSearch 
        searchSubmit={handleSearchSubmit} 
      />
      <Divider />
      <SideBarRecentPosts />
      <Divider />
      <SideBarTopics />
      <Divider />
    </div>
  )
}

export default ForumSideBar;