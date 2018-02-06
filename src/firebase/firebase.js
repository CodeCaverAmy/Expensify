// connet to the database

import * as firebase from 'firebase'; // * as - takes all the named exports, creating the new variable, firebase

// set firebase config
const config = {
    apiKey: "AIzaSyDdjIS_Wo9tnEpXN-lOu3aZtAhWeMVQsPw",
    authDomain: "expensify-8f4c7.firebaseapp.com",
    databaseURL: "https://expensify-8f4c7.firebaseio.com",
    projectId: "expensify-8f4c7",
    storageBucket: "expensify-8f4c7.appspot.com",
    messagingSenderId: "318572610113"
};

// make a connection to the database
firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({            // set returns a promise
    name: 'Amy Plant',
    age: 50,
    isSingle: false,
    location: {
        city: 'Milwaukee',
        state: 'Wisconsin', 
        zip: 53211
    }
}).then(() => {
    console.log('data is saved');
}).catch((error) => {
    console.log('oops, looks like something went wrong', error);
});

// removing some part of the database

// wipe isSingle from the database
// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('removed successfully');
//     })
//     .catch((e) => {
//     console.log('oops, I was not able to remove that');
// });

// remove the ENTIRE database
// database.ref()
//     .remove()
//     .then(() => {
//         console.log('removed successfully');
//     })
//     .catch((e) => {
//     console.log('oops, I was not able to remove that');
// });

// remove with SET
// database.ref('isSingle').set(null); 