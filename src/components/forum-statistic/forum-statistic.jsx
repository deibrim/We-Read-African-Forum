import React from 'react'
import { Link } from 'react-router-dom'
import post from '../../assets/statistic/post.svg'
import newMember from '../../assets/statistic/new-member.svg'
import recentPost from '../../assets/statistic/recent-post.svg'
import './forum-statistic.scss'
import ForumStatisticBox from '../forum-statistic-box/forum-statistic-box'
const ForumStatistics = () => {
    const stat = [{ count: 30, textVal: 'forums' }, { count: 575, textVal: 'topics' }, { count: 1175, textVal: 'posts' }, { count: 35, textVal: 'online' }, { count: 1240, textVal: 'members' }]
    return (
        <div className="forum-statistics">
            <div className="bar"> <span>Forum Statistics</span></div>
            <div className="statistics">
                {stat.map((item, index) => <ForumStatisticBox key={index} data={item} />)}
            </div>
            <div className="statistic-footer">
                <div className="latest-post">
                    <img className="stat-icon" src={post} alt="post" />
                    <span>Latest Post: <span>{'My top book for the year 2019'}</span> </span>
                </div>
                <div className="newest-member">
                    <img className="stat-icon" src={newMember} alt="user icon" />
                    <span>Newest Member: <span>{'Jane Doe'}</span></span>
                </div>
                <div className="recnt-post">
                    <img className="stat-icon" src={recentPost} alt="recent" />
                    <Link to="/recent-posts">
                        <span>Recent Posts</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForumStatistics
