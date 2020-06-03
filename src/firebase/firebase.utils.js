import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBZSP7CF1qWOUtI7710O6eT_SJPzm2ow1k',
  authDomain: 'blog-test-cf27d.firebaseapp.com',
  databaseURL: 'https://blog-test-cf27d.firebaseio.com',
  projectId: 'blog-test-cf27d',
  storageBucket: 'blog-test-cf27d.appspot.com',
  messagingSenderId: '712716765117',
  appId: '1:712716765117:web:757aed783e2814d70eb4d4',
  measurementId: 'G-3E2DRSVVNM',
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
  const newTopicRef = firestore.doc(`forum/${topicData.title}`);
  const snapShot = await newTopicRef.get();
  if (!snapShot.exists) {
    try {
      await newTopicRef.set({
        ...topicData,
      });
      return newTopicRef;
    } catch (error) {
      console.log('error adding comment to database', error.message);
    }
  } else {
    return 'This topic already exist';
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
