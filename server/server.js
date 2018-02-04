// Production Web Server using Express 

const path = require('path');
const express = require('express'); // require is the 'node' way of importing something
const app = express(); // create an a new instance of express, we now have an express application
const publicPath = path.join(__dirname, '..', 'public');

// sever up the public folder and everything inside
app.use(express.static(publicPath)); // register middleware

// lets us setup some function to run when someone makes a get request to our server
// called with 2 arguments - 1) path and 2) a function to run w/ request and response object
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

// start up the server on a specific port
app.listen(3000, () => {
    console.log('server is up');
})