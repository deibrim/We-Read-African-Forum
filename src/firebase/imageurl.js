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