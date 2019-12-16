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

// Import the Modules
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// Declare the component
@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.css']
})

// Export the class
export class TaskCreateDialogComponent implements OnInit {
  form: FormGroup;

 // Dialog creation component
  constructor(private dialogRef: MatDialogRef<TaskCreateDialogComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }
  /**
   * Submit the form
   */
  submit() {
    this.dialogRef.close(this.form.value);
  }

  /**
   * Close/Exit
   */
  close() {
    this.dialogRef.close();
  }

}

// end program
