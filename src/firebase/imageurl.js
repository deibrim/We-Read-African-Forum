import firebase from './firebase.utils';
import { auth } from './firebase.utils'
export const ImageUrl = async (selectedFile, loc) => {
    const storageRef = await firebase.storage().ref(`users/${auth.currentUser.uid}/${loc}/${selectedFile}`);

    // return await storageRef.put(selectedFile);
    const uploadTask = storageRef.put(selectedFile);

    uploadTask.snapshot.ref.getDownloadURL().then(
        function (downloadURL) {
            // You get your url from here 
            console.log('File available at', downloadURL);
            // print the image url  
            return downloadURL
        });
    // await uploadTask.on('state_changed', snapshot => {
    //     switch (snapshot.state) {
    //         case firebase.storage.TaskState.PAUSED:
    //             console.log('Upload is paused');
    //             break;
    //         case firebase.storage.TaskState.RUNNING:
    //             console.log('Upload is running');
    //             break;
    //     }
    // }, error => {
    //     console.log(error);
    // }, () => {
    //     // get the uploaded image url back 

    // });
};
// export const userPresence = async (userAuth) => {
//   const uid = auth.currentUser.uid;
//   const userStatusDatabaseRef = firebase.database().ref('/users/' + uid);
//   const isOfflineForDatabase = {
//     state: 'offline',
//     last_changed: firebase.database.ServerValue.TIMESTAMP,
//   };

//   const isOnlineForDatabase = {
//     state: 'online',
//     last_changed: firebase.database.ServerValue.TIMESTAMP,
//   };

//   firebase
//     .database()
//     .ref('.info/connected')
//     .on('value', function (snapshot) {
//       if (snapshot.val() === false) {
//         return;
//       }
//       userStatusDatabaseRef
//         .onDisconnect()
//         .set(isOfflineForDatabase)
//         .then(function () {
//           userStatusDatabaseRef.set(isOnlineForDatabase);
//         });
//     });
//   const userStatusFirestoreRef = firebase.firestore().doc('/users/' + uid);
//   const isOfflineForFirestore = {
//     state: 'offline',
//     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
//   };

//   const isOnlineForFirestore = {
//     state: 'online',
//     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
//   };

//   firebase
//     .database()
//     .ref('.info/connected')
//     .on('value', (snapshot) => {
//       if (snapshot.val() === false) {
//         userStatusFirestoreRef.update(isOfflineForFirestore);
//         return;
//       }
//       userStatusDatabaseRef
//         .onDisconnect()
//         .update(isOfflineForDatabase)
//         .then(() => {
//           userStatusDatabaseRef.update(isOnlineForDatabase);
//           userStatusFirestoreRef.update(isOnlineForFirestore);
//         });
//     });
//   userStatusFirestoreRef.onSnapshot(function (doc) {
//     const isOnline = doc.data().state ? doc.data().state === 'online' : null;
//     // ... use isOnline
//     if (!isOnline) {
//       userStatusDatabaseRef.update(isOfflineForDatabase);
//     }
//     // console.log(isOnline);
//   });
// };