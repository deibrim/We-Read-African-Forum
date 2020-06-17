import React from 'react';
import RecentPosts from '../../components/recent-posts/recent-posts'
import './recent-post.scss';
import ForumSideBar from '../../components/ForumSideBar/ForumSideBar';


//Components

const RecentPost = () => {
    return (
        <div className='RecentPost main'>
            <RecentPosts />
            <ForumSideBar />
        </div>
    )
}

export default RecentPost;