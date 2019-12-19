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
const port = process.env.PORT || 3000; // server port

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
  * FindAllTasks
  */

  app.get('/api/employees/:empId/tasks', function (req, res, next) {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, tasks) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(tasks);
        res.json(tasks);
      }
    })
  });



  /**
   * CreateTask
   */

   app.post('/api/employees/:empId/tasks', function(req, res, next) {
     Employee.findOne({'empId': req.params.empId}, function(err, employee) {
       if (err) {
         console.log(err);
         return next(err);
        } else {
          console.log(employee);

          const task = {
            text: req.body.text
          };

          employee.todo.push(task);
          employee.save(function(err, employee) {
            if (err) {
              console.log(err);
              return next(err);
            } else {
              console.log(employee);
              res.json(employee);
            }
          })
        }
      })
    });




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
 * UpdateTasks
 */
app.put('/api/employees/:empId/tasks', function(req, res, next) {
  Employee.findOne({'empId': req.params.empId}, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      employee.set({
        todo: req.body.todo,
        done: req.body.done
      });

      employee.save(function(err, employee) { // Save the actual record
        if (err) {
          console.log(err); // writes error to console
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        }
      })
    }
  })
});

/**
 * DeleteTask
 */
app.delete('/api/employees/:empId/tasks/:taskId', function(req, res, next) {
  Employee.findOne({'empId': req.params.empId}, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee)

      const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
      const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

      /**
       * If the todoItem is not null, then we know the item being deleted is todo
       */
      if (todoItem) {
        employee.todo.id(todoItem._id).remove();
        employee.save(function(err, emp1) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(emp1);
            res.json(emp1);
          }
        })
      } else if (doneItem) {
        /**
         * If the doneItem is not null, then the item being deleted is a doneTask
         */
        employee.done.id(doneItem._id).remove();
        employee.save(function(err, emp2) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(emp2);
            res.json(emp2);
          }
        })
      } else {
        /** Otherwise the item doesn't belong to either */
        console.log('Unable to locate task: ${req.params.taskId}');
        res.status(200).send({
          'type': 'warning',
          'text': 'Unable to locate task: ${req.params.taskId}'
        })
      }
    }
  })
});

/**
 * Create & Start Server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
});
// end server




// End Program
