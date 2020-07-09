import React, { useState } from 'react';
import { movePost } from '../../firebase/firbase.movePost';
const ForumSubForum = ({ item, url, post, toggleMovePostBox }) => {
  const [showSub, setshowSub] = useState(false);
  const handleShowSubToggle = (e) => {
    showSub ? setshowSub(false) : setshowSub(true);
  };
  const handleMovePost = (id) => {
    const goingRoute = {
      forum: item.name,
      subForum: id,
    };
    movePost(post, url, goingRoute);
    toggleMovePostBox(false);
  };
  return (
    <div>
      <div className="bar">
        <h3>{item.name}</h3>
        <svg
          onClick={handleShowSubToggle}
          style={
            showSub
              ? { transform: 'rotate(0deg)' }
              : { transform: 'rotate(180deg)' }
          }
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 0.300049L6 4.90009L10.6 0.300049L12 1.70009L6 7.70005L0 1.70009L1.4 0.300049Z"
            fill="white"
          />
        </svg>
      </div>
      <ul>
        {item.sub_forum.map(
          (sub_item, index) =>
            showSub && (
              <li key={index} onClick={handleMovePost.bind(this, sub_item)}>
                {sub_item}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default ForumSubForum;
