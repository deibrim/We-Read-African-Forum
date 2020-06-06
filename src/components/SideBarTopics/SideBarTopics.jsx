import React from 'react';
import './SideBarTopics.scss';


const recentTopicData = [
  {
    postTitle: 'Books for kids',
    postAuthor: 'Kinle',
    postMonth: 'October',
    postDate: '24',
    postYear: 2020,
  },
  {
    postTitle: 'Black Lives Matter',
    postAuthor: 'Everyone',
    postMonth: 'Mar',
    postDate: '11',
    postYear: 2020,
  },
  {
    postTitle: 'Bullet Proof',
    postAuthor: 'Mariam',
    postMonth: 'Jan',
    postDate: '03',
    postYear: 2020,
  },
  {
    postTitle: 'Fuck the PoPo',
    postAuthor: 'Me',
    postMonth: 'Apr',
    postDate: '11',
    postYear: 2020,
  },
]
const SideBarTopics = (props) => { 

  return ( 
    <div id='SideBarTopics'>
      <h4>Recent Topics</h4>
      { 
        recentTopicData.map(item => { 
          return (
          <div className="recenttopicBox">
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

export default SideBarTopics;