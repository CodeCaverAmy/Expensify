// write the firebase related authentication

import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        // call a firebase related method (promise chain)
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return () => {
        // call the firebase method to sign out
        return firebase.auth().signOut();
    };
};