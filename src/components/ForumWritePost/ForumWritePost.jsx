import React, { useState } from 'react'
import './ForumWritePost.scss';

const ForumWritePost = (props) => { 

  return (
    <form id='form'>
      <div id='formHeading'>
        <div id='userImg'>
          <img src='https://avatars0.githubusercontent.com/u/30846348?s=88&u=2b42c8f066c074b3183772888aba9a58ac1d50de&v=4' alt=''/>
        </div>
        <h2>Welcome, {props.userName}</h2>
      </div>
      <input placeholder='post a new topic' />
    </form>
  )
}

export default ForumWritePost;