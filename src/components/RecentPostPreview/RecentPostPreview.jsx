import React from 'react';
import './RecentPostPreview.scss';
import postIcon from '../../assets/postIcons.svg'
const RecentPostPreview = ({ data }) => {
    const date = new Date(data.posted_at ? data.posted_at : 1591257725 * 1000),
        months = [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        day = date.getDay(),
        month = months[date.getMonth()],
        year = date.getFullYear();

    return (
        <div className="recent-post-preview">
            <div className="post-icon-post-name">
                <img src={postIcon} alt="postIcon" />
                <div className="post-name">
                    <h4 className="title">{data.title}</h4>
                    <span>by {data.user.displayName}-{month} {day}</span>
                </div>
            </div>
            <div className="post-stat-post-author">
                <div className="post-stat">
                    <span className="replies">354 Replies</span>
                    <br />
                    <span className="views">22,801 Views</span>
                </div>
                <div className="post-author">
                    <img src={data.user.profile_pic ? data.user.profile_pic : ''} alt="" />
                    <div>
                        <h4 className="author-name">{data.user.displayName}</h4>
                        <span className="date-day">{month} {day}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default RecentPostPreview;