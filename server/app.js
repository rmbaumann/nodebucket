/*
=============================================
; Title: nodebucket
; Author: Reva Baumann
; Date: 24 November 2019
; Modified by: Reva Baumann
; Description: nodebucket task management system
;============================================
*/


// start program

// Require Statements
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./db-models/employee')

// App Configurations
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// Variables
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://userone:p@ssword@cluster0-dfuyw.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`);

  let app = express();
}); // end mongoose connection

/**
 * API(s)
 */

 /**
  * FindEmployeeById
  */
 app.get('/api/employees/:empId', function(req, res, next) {
   Employee.findOne({'empId': req.params.empId}, function(err, employee) {
     if (err) {
       console.log(err);
       return next(err);
     } else {
       console.log(employee);
       res.json(employee);
     }
   })
 });

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
