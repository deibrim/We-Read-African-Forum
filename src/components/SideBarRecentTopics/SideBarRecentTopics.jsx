import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSubForumTopicRoutes } from '../../redux/forum/forum.selector';
import './SideBarRecentTopics.scss';

const SideBarRecentTopics = ({ topics }) => {
  const recentTopicsData = () => {
    const tops = []
    topics.forEach(item => item.forEach((item2) => {
      tops.push(item2)
    }))
    return tops
  }

  return (
    <div id='SideBarRecentTopics'>
      <h4>Recent Topics</h4>
      {recentTopicsData().map((item, index) => {
        return (
          <div key={index} className="recentpostBox">
            <Link style={{ textTransform: 'capitalize' }} to={`${item}`}>{item.split('/')[1].split('_').join(' ')}</Link>
            {/* <p className="postDetails">
                By {item.postAuthor}- {item.postMonth} {item.postDate}, {item.postYear}
              </p> */}
            <div className="postIcon"></div>
          </div>
        )
      })}

    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  topics: selectSubForumTopicRoutes,
});


export default withRouter(connect(mapStateToProps)(SideBarRecentTopics));