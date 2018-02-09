// write the firebase related authentication

import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        // call a firebase related method (promise chain)
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};