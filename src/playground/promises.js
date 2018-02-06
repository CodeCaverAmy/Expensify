import { setTimeout } from "timers";

// Promises will allow us to do something after a long running task completes
// promises will often be generated for us, so we will just need to use them

const promise = new Promise((resolve, reject) => {                 // promise takes in a function as an argument - the function needs the arguments resolve and reject 
    // where we do our long asynchronous task
    setTimeout(() => {          // setTimeOut(function to run, number of ms to wait before running it)
        // resolve('This is my resolved data');  // resolve can only be run a single time (with only one argument - can be an object if multiple items need to be resolved)
        reject('Something went terribly wrong.');
    }, 1500);
}); 

console.log('before');

promise.then((data) => {        // .then lets us register a call back, firing when and if the promise resolves
    console.log('1', data);
}).catch((error) => {           // .catch takes in a function when an error is thrown, passing in the error as its argument
    console.log('error: ', error);
});

// alternatively the promise then/catch where the error function is passed into the .then as a second argument
promise.then((data) => {
    console.log('1', data);
}, (error) => {
    console.log('error: ', error);
});

console.log('after');