import React from 'react';
import './member-activity-box.scss';
const MemberActivityBox = ({ data: { img, num, text } }) => {
  return (
    <div className="member-activity-box">
      <img src={img} alt="posts icon" />
      <span className="number">{num}</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default MemberActivityBox;
