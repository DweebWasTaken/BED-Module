/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/



// setting path to .env

require('dotenv').config()




const app = require("./controller/app.js");

var express = require('express');

var serveStatic = require('serve-static');


app.use('/image', express.static(__dirname + '/image/'));


const hostname = 'localhost';
const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log("App hosted at localhost:" + port);
    console.log(process.env.PORT)
});