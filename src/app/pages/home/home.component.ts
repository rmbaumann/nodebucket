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

// Import the module
import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component';

// List detals of component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sessionUser: string;
  tasks: any;
  todo: any;
  done: any;


  /**
   * Cookie Service
   */
  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    this.sessionUser = this.cookieService.get('session_user');

    /**
     * Tasks in both areas
     */
    this.http.get('/api/employees/' + this.sessionUser + '/tasks').subscribe(res => {
      this.tasks = res;
      this.todo = this.tasks.todo;
      this.done = this.tasks.done;
      console.log(this.tasks);
      console.log(this.todo);
      console.log(this.done);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  /**
   * task dialog box
   */
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      disableClose: true
    });



    /**
     * POST to tasks
     */
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.http.post('/api/employees/' + this.sessionUser + '/tasks', {
          text: data.text
        }).subscribe(res => {
          this.tasks = res;
          this.todo = this.tasks.todo;
          this.done = this.tasks.done;
        }, err => {
          console.log(err);
        });
      }
    });
  }

    /**
     * Delete tasks
     */
  deleteTask(taskId) {
    if (taskId) {
      console.log(`Task item: ${taskId} is being removed.`);
      this.http.delete('/api/employees/' + this.sessionUser +'/tasks/' + taskId).subscribe(res => {
        this.tasks = res;
        this.todo = this.tasks.todo;
        this.done = this.tasks.done;
      }, err => {
        console.log(err);
      })
    }
  }

  /**
   * Drag between two columns
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasks(this.todo, this.done).subscribe(res => {
        this.tasks = res;
        this.todo = this.tasks.todo;
        this.done = this.tasks.done;
      }, err => {
        console.log("Error saving task");
        console.log(err);
      });
      console.log("Task has been moved");
      console.log(this.todo);
      console.log(this.done);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTasks(this.todo, this.done).subscribe(res => {
        this.tasks = res;
        this.todo = this.tasks.todo;
        this.done = this.tasks.done;
      }, err => {
        console.log('Unable to save task');
        console.log(err);
      });
      console.log('Task has been moved');
      console.log(this.todo);
      console.log(this.done);
    }
  }

  /**
   * UPDATE
   */
  updateTasks(todo, done) {
    return this.http.put('/api/employees/' + this.sessionUser + '/tasks', {
      todo: todo,
      done: done
    });
  }
}
// end program
