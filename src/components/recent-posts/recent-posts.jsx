import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLatestTopics } from '../../redux/forum/forum.selector';
import RecentPostPreview from '../RecentPostPreview/RecentPostPreview'
import './recent-posts.scss';

const RecentPosts = ({ latestTopics }) => {
    return (
        <div className='recent-posts'>
            <div className='bar'>
                <span>Post</span>
                <span>Last Message</span>
            </div>
            {latestTopics.filter((item, index) => index < 10).map((item, index) => <RecentPostPreview key={index} data={item.latest_post} />)}
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    latestTopics: selectLatestTopics,
});


export default withRouter(connect(mapStateToProps)(RecentPosts)); 