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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// details of the component
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

// Export the class
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  sessionUser: any;

  constructor(private cookieService: CookieService, private router: Router) {
    this.sessionUser = this.cookieService.get('session_user');

  }

  ngOnInit() {
  }

  logout() {
    this.cookieService.delete('session_user');
    this.router.navigate(['/session/signin']);
  }
}

// End Program
