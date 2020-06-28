import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import { firestore } from '../../firebase/firebase.utils';
import './forum-sub-page.scss';

const ForumSubPage = ({ match, history }) => {
  const [state, setState] = useState({ posts: [] });
  useEffect(() => {
    const fetchData = async () => {
      const subCategoryPostsRef = await firestore
        .collection('forums')
        .doc(`${match.url.split('/')[1]}`)
        .collection(
          `${match.url
            .split('/')[2]
            .split('_')
            .join(' ')
            .split('_')
            .join('')
            .split(' ')
            .join('_')}`
        );
      subCategoryPostsRef.onSnapshot(async (snapshot) => {
        const subCategoryPosts = [];
        snapshot.docs.forEach((doc) => {
          subCategoryPosts.push(doc.data());
        });
        setState({ posts: subCategoryPosts });
      });
    };
    fetchData();
  }, []);

  let [showEditBttns, setshowEditBttns] = useState(false);
  return (
    <div className="tag-page">
      {state.posts.map((item, index) => {
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
          new Date(item.user.createdAt.seconds * 1000).getHours() >= 12
            ? 'AM'
            : 'PM';

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
        return (
          <div key={index} id="postsContainer" style={{ marginBottom: '3em' }}>
            <div className="subHeading">
              <div id="subDetails">
                <h1>{item.title}</h1>
                <p>by {item.user.displayName}</p>
                <p>
                  {subMonthPosted} {subMonthDate}
                </p>
                <p>{item.subForum}</p>
              </div>
              <div id="subReplyBttn">
                <button>reply to this topic</button>
              </div>
            </div>

            <div id="subPosts">
              <div id="mainPosts">
                <div className="postData">
                  <div
                    className="authorImg"
                    style={{ backgroundImage: `url(${item.user.profile_pic}` }}
                  ></div>
                  <h1>{item.user.displayName}</h1>
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
                    <div>reply</div>
                    <div>like</div>
                    <div>Save</div>
                    <div
                      onClick={() =>
                        showEditBttns
                          ? setshowEditBttns(false)
                          : setshowEditBttns(true)
                      }
                    >
                      More
                    </div>
                    <div
                      id="more"
                      style={{
                        display: showEditBttns ? 'block' : 'none',
                      }}
                    >
                      Edit
                    </div>
                    <div
                      id="more"
                      style={{
                        display: showEditBttns ? 'block' : 'none',
                      }}
                    >
                      Report
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // forums: selectForumFilteredTopic(
    //   ownProps.match.params.forumSubCategoryId,
    //   ownProps.match.url
    // )(state),
  };
};

export default withRouter(connect(mapStateToProps)(ForumSubPage));
