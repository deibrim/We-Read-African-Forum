import React from 'react';
import { Link } from 'react-router-dom'
import './member-preview.scss';
import StarRating from '../rating/rating';
const MemberPreview = ({ data }) => {
  const { displayName, rating, createdAt, posts, id } = data,
    date = new Date(createdAt.seconds * 1000),
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
    currentMonth = months[date.getMonth()],
    year = date.getFullYear();
  return (
    <div className="member-preview">
      <div className="avat">
        {data.profile_pic ? <img src={data.profile_pic} alt="profile pic" /> : <img src='https://img.favpng.com/23/0/3/computer-icons-user-profile-clip-art-portable-network-graphics-png-favpng-YEj6NsJygkt6nFTNgiXg9fg9w.jpg' alt="profile pic" />}
      </div>
      <div className="member-info">
        <Link to={`/members/${id}`}>
          <h5 className="member-info-name">{displayName}</h5>
        </Link>
        <div className="sub-member-info">
          <StarRating rating={rating} />
          <span className="seprator">|</span>
          <span>posts: {posts.length}</span>
        </div>
      </div>
      <div className="regi">
        <span>
          {currentMonth} {year}
        </span>
      </div>
    </div>
  );
};

export default MemberPreview;
