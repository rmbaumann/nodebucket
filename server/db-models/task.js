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
const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
  text: {type: String}
});

module.exports = taskSchema;

// End Program
