import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import { firestore, reportPost } from '../../firebase/firebase.utils';
import CommentBox from '../../components/comment-box/comment-box';
import Comments from '../../components/comments/comments';
import EditPost from '../edit-post/edit-post';
import MovePost from '../move-post/move-post';

const PostView = ({ likenum, item, currentUser, history, match, id }) => {
  let [showCommentBox, toggleCommentBox] = useState(false);
  let [showEditPostBox, toggleEditPostBox] = useState(false);
  let [showMovePostBox, toggleMovePostBox] = useState(false);
  let [user, setUser] = useState({ user: null });
  let [comments, setComments] = useState({ comments: [] });
  useEffect(() => {
    const getUserProfile = async () => {
      const userRef = firestore.doc(`users/${item.user.id}`);
      const snapShot = await userRef.get();
      setUser({ user: snapShot.data() });
      const commentRef = await firestore
        .collection('forums')
        .doc(`${match.url.split('/')[1]}`)
        .collection(`${match.url.split('/')[2]}`)
        .doc(`${item.id}`)
        .collection('comments');
      const comments = [];
      commentRef.onSnapshot((snapShot) => {
        snapShot.docs.forEach((item) => {
          comments.push(item.data());
          setComments({ comments: comments });
        });
      });
    };
    getUserProfile();
  }, []);

  let months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'june',
    'july',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec',
  ];
  let subMonthPosted = months[new Date(item.posted_at).getMonth()];
  let subMonthDate = new Date(item.posted_at).getDate();

  let postDayLight =
    new Date(item.user.createdAt.seconds * 1000).getHours() >= 12 ? 'AM' : 'PM';

  let postHour =
    new Date(item.user.createdAt.seconds * 1000).getHours() >= 12
      ? new Date(item.user.createdAt.seconds * 1000).getHours() - 12
      : new Date(item.user.createdAt.seconds * 1000).getHours();

  let postMins =
    new Date(item.user.createdAt.seconds * 1000).getMinutes() < 10
      ? `0${new Date(item.user.createdAt.seconds * 1000).getMinutes()}`
      : new Date(item.user.createdAt.seconds * 1000).getMinutes();

  let userJoinedMonth = [
    months[new Date(item.user.last_changed.seconds * 1000).getMonth()],
    new Date(item.user.last_changed.seconds * 1000).getFullYear(),
  ];
  let userpostList = item.user.posts.length;

  const handleToggleCommentBox = () => {
    if (!currentUser) {
      history.push('/signin');
      return;
    }
    toggleCommentBox(!showCommentBox);
  };
  const handleLikePost = async () => {
    let likerpoststate = true;
    item.likers.forEach((item) => {
      if (item === currentUser.id) {
        likerpoststate = false;
      }
    });
    const likepost = await firestore
      .collection('forums')
      .doc(`${match.url.split('/')[1]}`)
      .collection(`${match.url.split('/')[2]}`)
      .doc(`${item.id}`);

    const likeSnapShot = await likepost.get();
    if (likeSnapShot.exists) {
      //  console.log(likeSnapShot.data());
      let likers =
        likeSnapShot.data().likers.length === 0
          ? []
          : likeSnapShot.data().likers;
      let likes = likeSnapShot.data().likes;
      if (likerpoststate) {
        if (likeSnapShot.data().likers.length === 0) {
          likepost.update({ likers: [currentUser.id], likes: likes + 1 });
        } else {
          likers.forEach((item) => {
            if (item !== currentUser.id) {
              likepost.update({
                likers: [...likeSnapShot.data().likers, currentUser.id],
                likes: likes + 1,
              });
            }
          });
        }
      } else {
        let newLikersArr = likers.filter((item) => item !== currentUser.id);
        console.log(newLikersArr);
        likepost.update({ likers: newLikersArr, likes: likes - 1 });
      }
    }
  };

  const handleReportPost = () => {
    reportPost(
      { name: item.title, id: item.id, route: match.url },
      {
        id: user.user.id,
        email: user.user.email,
        name: user.user.displayName,
        profile_pic: user.user.profile_pic,
      }
    );
  };

  return (
    <div>
      {showEditPostBox && (
        <EditPost
          url={match.url}
          postId={item.id}
          toggleEditPostBox={toggleEditPostBox}
          body={item.body}
        />
      )}
      {showMovePostBox && (
        <MovePost
          url={match.url}
          post={item}
          toggleMovePostBox={toggleMovePostBox}
        />
      )}
      <div id="postsContainer" style={{ marginBottom: '3em' }} className={id}>
        <div className="subHeading">
          <div id="subDetails">
            <h1>{item.title}</h1>
            <p>by {user.user && user.user.displayName}</p>
            <p>
              {subMonthPosted} {subMonthDate}
            </p>
            <p>{item.subForum}</p>
          </div>
          <div id="subReplyBttn">
            <button onClick={handleToggleCommentBox}>
              reply to this topic
            </button>
          </div>
        </div>

        <div id="subPosts">
          <div id="mainPosts">
            <div className="postData">
              <div
                className="authorImg"
                style={{
                  backgroundImage: `url(${user.user && user.user.profile_pic}`,
                }}
              ></div>
              <h1>{user.user && user.user.displayName}</h1>
              <p>
                Joined: {userJoinedMonth[0]} {userJoinedMonth[1]}
              </p>
              <p>Posts: {userpostList}</p>
              <h3>{item.user.isAdmin ? 'admin' : ''}</h3>
            </div>
            <div className="postMainText">
              <p className="post-date-time">
                {`${
                  months[
                    new Date(item.user.createdAt.seconds * 1000).getMonth()
                  ]
                } ${new Date(
                  item.user.createdAt.seconds * 1000
                ).getDate()}, ${new Date(
                  item.user.createdAt.seconds * 1000
                ).getFullYear()}. ${postHour}:${postMins} ${postDayLight}`}
              </p>
              <div className="post-body">{renderHTML(`${item.body}`)}</div>
              <div id="postActions">
                <p>reply</p>
                <p onClick={handleLikePost} id={`like${id}`}>
                  {likenum}
                </p>
                <p onClick={() => toggleMovePostBox(true)}>move</p>
                <p
                  onClick={() => {
                    toggleEditPostBox(true);
                  }}
                >
                  edit
                </p>
                <p onClick={handleReportPost}>report</p>
              </div>
              {comments.length !== 0 && (
                <Comments
                  comments={comments.comments}
                  url={match.url}
                  postId={item.id}
                />
              )}
              {showCommentBox ? (
                <CommentBox url={match.url} postId={item.id} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
