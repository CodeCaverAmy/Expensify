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

// child_removed (triggered when a child of expenses is removed)
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_changed (triggered when a child of expenses is changed)
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_added (triggered when a child is added) -- triggers one time for all of the data, and then rerun for all added children
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// });


// setup expenses with three items (description, note, amount, createdAt)
// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 90000,
//     createdAt: 987634
// });

// database.ref('notes/-L4gNFereRM3j_Zsj8Ld').remove();

// database.ref('notes').push({
//     title: 'To Do',
//     body: 'Go for a run'
// });

// const firebaseNotes = {
//     notes: {
//         12: {
//             title: 'First Note',
//             body: 'This is my note'
//         }, 
//         17:
//         {
//             title: 'Secon note',
//             body: 'This is my second note'
//         }
//     }
// };

// const notes = [{
//     id: '12',
//     title : 'First note!',
//     body: 'This is my note'
// }, {
//     id: '17',
//     title : 'Second note!',
//     body: 'This is my second note'
// }];

// database.ref('notes').set(notes);

// ---- Fetching the Data ----
// *** once ***
// database.ref()                          // if ref() argument is emtpy, returns the entire root dabasee .. ref('location') would return just the location data
//     .once('value')                      //returns a promise
//     .then((snapshot) => {               // snapshot gives us access to our data
//         const val = snapshot.val();     // .val() returns the data requested
//         console.log(val);
//     }).catch((e) => {

//     });

// *** on *** 
// const onValueChange = database.ref().on('value', (snapshot) => {  // .on retrieves the data whenever the data changes, .on() takes two arguments .. value back and a callback fundtion 
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error getting the data', e);
// });

// const onValueChange = database.ref().on('value', (snapshot) => {  // .on retrieves the data whenever the data changes, .on() takes two arguments .. value back and a callback fundtion 
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//     console.log('Error getting the data', e);
// });

// database.ref().set({            // set returns a promise
//     name: 'Amy Plant',
//     age: 50,
//     job: {
//         title: 'Software Developer',
//         company: 'AB Data'
//     },
//     stressLevel: 9,
//     location: {
//         city: 'Milwaukee',
//         state: 'Wisconsin', 
//         zip: 53211
//     }
// }).then(() => {
//     console.log('data is saved');
// }).catch((error) => {
//     console.log('oops, looks like something went wrong', error);
// });

// updates - add / update / delete
// database.ref().update({
//     name: 'MJ Brummitt',    // update
//     age: 62,                // update
//     isSingle: null,         // delete
//     'job/title': 'English Teacher', // add
//     // location: {     
//     //     city: 'Mexico City' // only updates at root level, so this will overwite entire location object
//     // }
//     'location/city': 'Mexico City' // this will 'fix' to only modify the city without touching other child objects (location/city are in single quotes due to the / breaking JS)
// });

// database.ref().update({
//     'job/company': 'Code Cave Camp', 
//     stressLevel: 3
// })

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