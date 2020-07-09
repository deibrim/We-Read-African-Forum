import { firestore } from './firebase.utils';
export const movePost = async (post, currentRoute, goingRoute) => {
  const forumRoute = goingRoute.forum
    .split('/')
    .join('')
    .split(' ')
    .join('_')
    .toLowerCase();
  const subForumRoute = goingRoute.subForum
    .split('/')
    .join('')
    .split(' ')
    .join('_')
    .toLowerCase();
  //   const forumSubRef = await firestore
  //     .collection('forums')
  //     .doc(`${forumRoute}`)
  //     .collection(`${subForumRoute}`);
  //   await forumSubRef.doc(post.id).set(post);
  //   const currentRouteRef = await firestore
  //     .collection('forums')
  //     .doc(`${currentRoute.split('/')[1]}`)
  //     .collection(`${currentRoute.split('/')[2]}`)
  //     .doc(`${post.id}`);
  //   await currentRouteRef.delete();
  updateForumDataG(post, forumRoute, subForumRoute);
  updateForumDataC(
    post,
    currentRoute.split('/')[1],
    currentRoute.split('/')[2]
  );
};
const updateForumDataG = async (post, forumRoute, subForumRoute) => {
  const forumPreviewRef = await firestore
    .collection('forum_preview_data')
    .doc(`${forumRoute}`);
  forumPreviewRef.get().then(async (doc) => {
    const updatedArr = [];
    doc.data().data.forEach((item) => {
      console.log(
        item.id.split('/').join('').split(' ').join('_').toLowerCase(),
        subForumRoute
      );

      if (
        item.id.split('/').join('').split(' ').join('_').toLowerCase() ===
        subForumRoute
      ) {
        item.latest_post = post;
        item.post_count = item.post_count + 1;
      }
      updatedArr.push(item);
    });
    console.log(updatedArr);
    try {
      await forumPreviewRef.update({ data: updatedArr });
      return;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  });
};
const updateForumDataC = async (post, forumRoute, subForumRoute) => {
  const forumPreviewRef = await firestore
    .collection('forum_preview_data')
    .doc(`${forumRoute}`);
  forumPreviewRef.get().then(async (doc) => {
    const updatedArr = [];
    doc.data().data.forEach((item) => {
      console.log(
        item.id.split('/').join('').split(' ').join('_').toLowerCase(),
        subForumRoute
      );
      if (
        item.id.split('/').join('').split(' ').join('_').toLowerCase() ===
        subForumRoute
      ) {
        item.latest_post = '';
        item.post_count = item.post_count - 1;
      }
      updatedArr.push(item);
    });
    console.log(updatedArr);

    try {
      await forumPreviewRef.update({ data: updatedArr });
      return;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  });
};
