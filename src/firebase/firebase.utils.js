import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdn1cJs_5oYF8doE4vPO0CbirHoT-TER4",
  authDomain: "we-read-african-forum.firebaseapp.com",
  databaseURL: "https://we-read-african-forum.firebaseio.com",
  projectId: "we-read-african-forum",
  storageBucket: "we-read-african-forum.appspot.com",
  messagingSenderId: "841746569390",
  appId: "1:841746569390:web:7309e1dcf690104c29353f",
  measurementId: "G-CQQ8G7CLFH"
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
  const userStatusDatabaseRef = firebase.database().ref('/users/' + uid);
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  firebase
    .database()
    .ref('.info/connected')
    .on('value', function (snapshot) {
      if (snapshot.val() === false) {
        return;
      }
      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function () {
          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
    });
  const userStatusFirestoreRef = firebase.firestore().doc('/users/' + uid);
  const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase
    .database()
    .ref('.info/connected')
    .on('value', (snapshot) => {
      if (snapshot.val() === false) {
        userStatusFirestoreRef.update(isOfflineForFirestore);
        return;
      }
      userStatusDatabaseRef
        .onDisconnect()
        .update(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.update(isOnlineForDatabase);
          userStatusFirestoreRef.update(isOnlineForFirestore);
        });
    });
  userStatusFirestoreRef.onSnapshot(function (doc) {
    const isOnline = doc.data().state ? doc.data().state === 'online' : null;
    // ... use isOnline
    if (!isOnline) {
      userStatusDatabaseRef.update(isOfflineForDatabase);
    }
    // console.log(isOnline);
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
  const { fullName,
    bio,
    website,
    cover,
    profile_pic,
    location,
    signature, } = incomingData;
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

const storageRef = firebase.storage().ref();

export const uploadImage = async (file, loc) => {
  storageRef
    .child(`users/${auth.currentUser.uid}/${loc}/${file.name}`)
    .put(file)
    .then((snapshot) => {
      return "success"
    });
};

export const sendNewTopicToDatabase = async (topicData) => {
  const forumSubRef = await firestore
    .collection('forums').doc(`${topicData.forum.split(' ').join('_')}`).collection(`${topicData.subForum.split(' ').join('_')}`)
  await forumSubRef.doc().set(topicData)

  const forumPreviewRef = await firestore
    .collection('forum_preview_data').doc(`${topicData.forum.split(' ').join('_')}`)
  forumPreviewRef.get()
    .then(async doc => {
      const updatedArr = []
      doc.data().data.forEach(item => {
        if (item.id.split(' ').join('_').toLowerCase() === topicData.subForum.split(' ').join('_').toLowerCase()) {
          item.latest_post = topicData
          item.post_count = item.post_count + 1
        }
        updatedArr.push(item)
      })

      try {
        await forumPreviewRef.update({ data: updatedArr });
        return;
      } catch (error) {
        console.log('error updating profile', error.message);
      }
    })

  const userRef = await firestore.doc(`users/${topicData.user.id}`)
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    let posts = [];
    posts = snapShot.data().posts;
    posts.push(topicData);
    try {
      await userRef.update({
        posts,
      });
      console.log("Success");

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
