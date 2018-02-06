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

database.ref().set({
    name: 'Amy Plant',
    age: 50,
    isSingle: false,
    location: {
        city: 'Milwaukee',
        state: 'Wisconsin', 
        zip: 53211
    }
});

// database.ref().set('My Data');

database.ref('age').set(51);

database.ref('location/city').set('Minneapolis');

database.ref('/attributes').set({
    height: 66,
    weight: 130
});