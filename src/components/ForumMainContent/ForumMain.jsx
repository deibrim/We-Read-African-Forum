import React, { useState } from 'react';
import Firebase from 'firebase';
import './ForumMain.scss';

//Components 
import ForumWritePost from '../ForumWritePost/ForumWritePost';
import Categories from '../Categories/Categories';


const ForumMain = (props) => { 
  return ( 
    <div id='forumMain'> 
      < ForumWritePost 
        userName='james'
      />
      <Categories />
    </div>
  )
}

export default ForumMain;