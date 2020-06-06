import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestore, getSubCategoryPosts } from '../../firebase/firebase.utils'
// import { selectForumFilteredTopic } from '../../redux/forum/forum.selector';
import './forum-sub-page.scss';

const ForumSubPage = ({ match }) => {
  const [state, setState] = useState({ posts: [] })
  useEffect(() => {
    const fetchData = async () => {
      const subCategoryPostsRef = await firestore
        .collection('forums').doc(`${match.url.split('/')[1]}`).collection(`${match.url.split('/')[2].split('_').join(' ').split('_').join('').split(' ').join('_')}`)
      subCategoryPostsRef.onSnapshot(async (snapshot) => {
        const subCategoryPosts = [];
        snapshot.docs.forEach((doc) => {
          subCategoryPosts.push(doc.data());
        });
        console.log(subCategoryPosts);
        setState({ posts: subCategoryPosts })
      })

    }
    fetchData()
  }, [])

  return (
    <div className="tag-page">
      <h1>Sub Page</h1>
      {state.posts.map((item, index) => <h1 key={index}>{item.title}</h1>)}
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
