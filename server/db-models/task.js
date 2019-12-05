const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
  text: {type: String, require: true, unique: true, default: 'Create a task here'},
  date_created: {type: Date, default: new Date()} // Adds details of date creation and modifications
});

module.exports = taskSchema;
