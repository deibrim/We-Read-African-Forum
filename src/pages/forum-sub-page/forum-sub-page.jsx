import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';
import './forum-sub-page.scss';
import PostView from '../../components/post-view/post-view';

const ForumSubPage = ({ match, history, currentUser }) => {
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

  const checkLikedState = (likers) => { 
    let likestate;
    if(currentUser) { 
      likers.forEach(item => { 
        if(item === currentUser.id) { 
          likestate = true
        }
        else { 
          likestate = false
        }
      })
    }

    return likestate;
  } 

  let [userlikescurrentpost, setuserlikescurrentpost] = useState(false);
  return (
    <div className="tag-page">
      {state.posts.map((item, index) => { 
        let userLiked = checkLikedState(item.likers);
        console.log(userLiked);
        return ( 
          <PostView
            key={index}
            item={item}
            match={match}
            currentUser={currentUser}
            history={history}
            likers={item.likers}
            id={(userLiked) ? 'true' : 'false'}
            likenum={item.likes}
         />
        )
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.currentUser,
    // forums: selectForumFilteredTopic(
    //   ownProps.match.params.forumSubCategoryId,
    //   ownProps.match.url
    // )(state),
  };
};

export default withRouter(connect(mapStateToProps)(ForumSubPage));
