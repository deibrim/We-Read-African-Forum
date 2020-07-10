import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBdn1cJs_5oYF8doE4vPO0CbirHoT-TER4',
  authDomain: 'we-read-african-forum.firebaseapp.com',
  databaseURL: 'https://we-read-african-forum.firebaseio.com',
  projectId: 'we-read-african-forum',
  storageBucket: 'we-read-african-forum.appspot.com',
  messagingSenderId: '841746569390',
  appId: '1:841746569390:web:7309e1dcf690104c29353f',
  measurementId: 'G-CQQ8G7CLFH',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, uid, emailVerified } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        id: uid,
        displayName,
        email,
        createdAt,
        rating: 1,
        posts: [],
        isAdmin: false,
        isGrandAdmin: false,
        emailVerified,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const userPresence = async (userAuth) => {
  const uid = auth.currentUser.uid;
  const connectedRef = firebase.database().ref('.info/connected');
  const userStatusDatabaseRef = firebase.database().ref('/users/' + uid);
  const presenceRef = firebase.database().ref('presence');
  const userStatusFirestoreRef = firebase.firestore().doc('/users/' + uid);
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  connectedRef.on('value', function (snapshot) {
    if (snapshot.val() === false) {
      return;
    }
    const ref = presenceRef.child(uid);
    ref.set(true);
    ref.onDisconnect().remove((err) => {
      if (err !== null) {
        console.log(err);
      }
    });
    userStatusDatabaseRef.set(isOnlineForDatabase).then(function () {
      userStatusFirestoreRef.update(isOnlineForFirestore);
    });
    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase, (err) => {
      if (err !== null) {
        console.log(err);
      }
      userStatusFirestoreRef.update(isOfflineForFirestore);
    });
  });
};

export const getMemberProfiles = async () => {
  const membersRef = firestore.collection('users');
  membersRef.onSnapshot(async (snapshot) => {
    const membersArr = [];
    snapshot.docs.forEach((doc) => {
      console.log(doc);
      membersArr.push(doc);
    });

    return membersArr;
  });
};

export const updateProfile = async (userId, incomingData) => {
  const {
    fullName,
    bio,
    website,
    cover,
    profile_pic,
    location,
    signature,
  } = incomingData;
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      await userRef.update({
        displayName: fullName,
        bio,
        website,
        cover,
        profile_pic,
        location,
        signature,
      });
      return userRef;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  }
};

export const addAComment = async ({ collection, d_ata, postId }) => {
  const commentRef = await firestore
    .collection('forums')
    .doc(`${collection.split('/')[1]}`)
    .collection(`${collection.split('/')[2]}`)
    .doc(`${postId}`)
    .collection('comments')
    .doc(`${d_ata.id}`);
  commentRef.set(d_ata);
};
export const reportPost = async (post, user) => {
  const reportData = {
    author: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
    },
    id: post.id,
    name: post.name,
    report_count: 1,
    route: post.route,
  };
  const reportRef = await firestore
    .collection('reported-posts')
    .doc(`${post.id}`);
  const snapShot = await reportRef.get();
  if (snapShot.exists) {
    const previousReportCount = snapShot.data().report_count;
    try {
      reportRef.update({ report_count: previousReportCount + 1 });
    } catch (error) {
      console.log('', error);
    }
  } else {
    try {
      reportRef.set(reportData);
    } catch (error) {
      console.log('', error);
    }
  }
};

export const addAReply = async ({ collection, d_ata, commentId, postId }) => {
  const commentRef = await firestore
    .collection('forums')
    .doc(`${collection.split('/')[1]}`)
    .collection(`${collection.split('/')[2]}`)
    .doc(`${postId}`)
    .collection('comments')
    .doc(`${commentId}`);
  const snapShot = await commentRef.get();
  if (snapShot.exists) {
    let replies = [];
    replies = snapShot.data().replies;
    replies.push(d_ata);
    try {
      await commentRef.update({
        replies,
      });
      console.log('Success');

      return;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  }
};

const storageRef = firebase.storage().ref();

export const uploadImage = async (file, loc) => {
  storageRef
    .child(`users/${auth.currentUser.uid}/${loc}/${file.name}`)
    .put(file)
    .then((snapshot) => {
      return 'success';
    });
};
export const updateForumNamesAdmin = async (topicData) => {
  const forumPreviewDataRef = await firestore
    .collection('forum_names')
    .doc(`reader's_hub`);
  forumPreviewDataRef.set({
    name: `Reader's Hub`,
    sub_forum: [
      'Book Blogs - Discuss your reading',
      'Reading Challenges',
      'General Book Discussions',
      'Competitions & Giveaways',
    ],
  });
};
export const updateTopicsAdmin = async (topicData) => {
  const forumPreviewDataRef = await firestore
    .collection('forum_preview_data')
    .doc(
      `${topicData.path.split('/').join('').split(' ').join('_').toLowerCase()}`
    );
  const datObj = {
    id: topicData.id.split('/').join('').split(' ').join('_').toLowerCase(),
    description: topicData.description,
    latest_post: {},
    post_count: 0,
  };
  const snapShot = await forumPreviewDataRef.get();
  if (snapShot.exists) {
    const initialObj = { id: snapShot.data().id };
    const initialData = [...snapShot.data().data];
    if (snapShot.data().data.length === 0) {
      initialData.push(datObj);
      initialObj['data'] = initialData;
      forumPreviewDataRef.set(initialObj);
      console.log('New Sub Forum 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
      return;
    } else {
      const filterToCompare = snapShot
        .data()
        .data.filter(
          (item, index) =>
            item.id !==
            topicData.id.split('/').join('').split(' ').join('_').toLowerCase()
        );
      let dataNotEqZero = [];
      if (filterToCompare.length !== snapShot.data().data.length) {
        return;
      }
      dataNotEqZero = snapShot.data().data;
      dataNotEqZero.push(datObj);
      initialObj['data'] = dataNotEqZero;
      // console.log("When Lenght is Not Zero🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", initialObj);
      forumPreviewDataRef.set(initialObj);
    }
  } else {
    forumPreviewDataRef.set({
      id: topicData.path.split('/').join('').split(' ').join('_').toLowerCase(),
      data: [datObj],
    });
  }
};
// REGEX .replace(/[^\w\s]/gi, '')

export const sendNewTopicToDatabase = async (topicData) => {
  const forumSubRef = await firestore
    .collection('forums')
    .doc(`${topicData.forum.split('/').join('').split(' ').join('_')}`)
    .collection(
      `${topicData.subForum.split('/').join('').split(' ').join('_')}`
    );
  await forumSubRef.doc(topicData.id).set(topicData);
  const forumPreviewRef = await firestore
    .collection('forum_preview_data')
    .doc(`${topicData.forum.split('/').join('').split(' ').join('_')}`);
  forumPreviewRef.get().then(async (doc) => {
    const updatedArr = [];
    doc.data().data.forEach((item) => {
      console.log(
        item.id.split('/').join('').split(' ').join('_').toLowerCase(),
        topicData.subForum
          .split('/')
          .join('')
          .split(' ')
          .join('_')
          .toLowerCase()
      );
      if (
        item.id.split('/').join('').split(' ').join('_').toLowerCase() ===
        topicData.subForum
          .split('/')
          .join('')
          .split(' ')
          .join('_')
          .toLowerCase()
      ) {
        item.latest_post = topicData;
        item.post_count = item.post_count + 1;
      }
      updatedArr.push(item);
    });
    try {
      await forumPreviewRef.update({ data: updatedArr });
      return;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  });

  const userRef = await firestore.doc(`users/${topicData.user.id}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    let posts = [];
    posts = snapShot.data().posts;
    posts.push({
      id: topicData.id,
      forum: topicData.forum.split('/').join('').split(' ').join('_'),
      sub_forum: topicData.subForum.split('/').join('').split(' ').join('_'),
    });
    try {
      await userRef.update({
        posts,
      });
      console.log('Success');

      return;
    } catch (error) {
      console.log('error updating profile', error.message);
    }
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: 'popup',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;
