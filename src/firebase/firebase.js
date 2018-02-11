// connet to the database

import * as firebase from 'firebase'; // * as - takes all the named exports, creating the new variable, firebase

// set firebase config
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// make a connection to the database
firebase.initializeApp(config);

const database = firebase.database();

// set up Google Provider for user authentication
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export firebase and the database variable in case someone wants to take advantage of them
export { firebase, googleAuthProvider, database as default };