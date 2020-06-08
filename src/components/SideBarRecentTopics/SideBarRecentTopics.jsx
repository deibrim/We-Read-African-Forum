import React from 'react';
import './SideBarRecentTopics.scss';

const SideBarRecentTopics = (props) => {

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
    <div id='SideBarRecentTopics'>
      <h4>Recent Topics</h4>
      {
        recentPostData.map((item, index) => {
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

export default SideBarRecentTopics;