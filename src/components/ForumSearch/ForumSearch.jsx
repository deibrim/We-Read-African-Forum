import React from 'react';
import './ForumSearch.scss';

const ForumSearch = (props) => { 

  return ( 
    <form onSubmit={props.searchSubmit} id='forumSearch'>
      <h3>Forum Search</h3>
      <div id='inputs'>
        <input type="text" placeholder='Search...'/>
        <div id='searchIcon'></div>
      </div>
    </form>
  )
}

export default ForumSearch;