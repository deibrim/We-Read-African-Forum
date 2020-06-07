import React from 'react';
import './SideBarRecentPosts.scss';

const SideBarRecentPosts = (props) => { 

  let recentPostData = [ 
    {
      postTitle: 'The Gaming Box',
      postAuthor: 'James',
      postMonth: 'July',
      postDate: '14',
      postYear: 2020,
    },

    {
      postTitle: 'The Gaming Box',
      postAuthor: 'James',
      postMonth: 'July',
      postDate: '14',
      postYear: 2020,
    },

    {
      postTitle: 'Buy books in lagos',
      postAuthor: 'James',
      postMonth: 'July',
      postDate: '14',
      postYear: 2020,
    }
  ]
  return ( 
    <div id='sideBarRecentPosts'>
      <h4>Recent Posts</h4>
      { 
        recentPostData.map(item => { 
          return (
          <div className="recentpostBox">
            <a>{item.postTitle}</a>
            <p className="postDetails">
              By {item.postAuthor}- {item.postMonth} {item.postDate}, {item.postYear} 
            </p>
            <div className="postIcon"></div>
          </div>
          )
        })
      }
    </div>
  )
}

export default SideBarRecentPosts;