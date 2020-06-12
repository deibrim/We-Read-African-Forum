import React from 'react'
import './forum-statistic-box.scss'
const ForumStatisticBox = ({ data }) => {
    return (
        <div className="forum-statistic-box">
            <span className="count">{data.count}</span>
            <span className="text-val">{data.textVal}</span>
        </div>
    )
}

export default ForumStatisticBox
