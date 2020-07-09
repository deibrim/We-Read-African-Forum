import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import ForumSubForum from './forum-sub_forum';
import './move-post.scss';
const MovePost = ({ url, post, toggleMovePostBox }) => {
  const [state, setState] = useState({
    forum_name_arr_obj: [],
  });
  useEffect(() => {
    const fetchData = () => {
      const forumNamesRef = firestore.collection('forum_names');
      forumNamesRef.onSnapshot(async (snapshot) => {
        const forumNameArrObj = [];
        snapshot.docs.forEach((doc) => {
          forumNameArrObj.push(doc.data());
        });
        setState({
          forum_name_arr_obj: forumNameArrObj,
        });
      });
    };
    fetchData();
  }, []);
  return (
    <div className="move-post-container">
      <div className="move-post">
        <h1>Move To</h1>
        {state.forum_name_arr_obj.map((item, index) => (
          <ForumSubForum
            key={index}
            item={item}
            url={url}
            post={post}
            toggleMovePostBox={toggleMovePostBox}
          />
        ))}
      </div>
    </div>
  );
};

export default MovePost;
