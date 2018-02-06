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
    job: {
        title: 'Software Developer',
        company: 'AB Data'
    },
    stressLevel: 9,
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

// updates - add / update / delete
database.ref().update({
    name: 'MJ Brummitt',    // update
    age: 62,                // update
    isSingle: null,         // delete
    job: 'English Teacher', // add
    // location: {     
    //     city: 'Mexico City' // only updates at root level, so this will overwite entire location object
    // }
    'location/city': 'Mexico City' // this will 'fix' to only modify the city without touching other child objects (location/city are in single quotes due to the / breaking JS)
});

database.ref().update({
    'job/company': 'Code Cave Camp', 
    stressLevel: 3
})

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