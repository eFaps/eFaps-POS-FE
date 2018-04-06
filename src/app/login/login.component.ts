import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService, UserService, User } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  users: User[] = [];
  loading = false;
  error = '';

  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
