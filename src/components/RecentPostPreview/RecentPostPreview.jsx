import React from 'react';
import './RecentPostPreview.scss';

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
        <div className="recenttopicBox">
            <a>{data.title}</a>
            <p className="postDetails">
                By {data.user.displayName}-{month} {day}, {year}
            </p>
            <div className="postIcon"></div>
        </div>
    )
}



export default RecentPostPreview;