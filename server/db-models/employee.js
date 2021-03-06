/*
=============================================
; Title: nodebucket
; Author: Reva Baumann
; Date: 1 December 2019
; Modified by: Reva Baumann
; Description: nodebucket task management system
;============================================
*/

// start program

const mongoose = require('mongoose');
const Task = require('./task')

// Declare Emp database Schema

let employeeSchema = mongoose.Schema({
  empId:     {type: String, unique: true, dropDups: true},
  firstname: {type: String},
  lastname:  {type: String},
  todo:      [Task],
  done:      [Task]
});

 // Export the module
 module.exports = mongoose.model('Employee', employeeSchema);

 // End program
