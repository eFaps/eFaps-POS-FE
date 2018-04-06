import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatKeyboardService } from '@ngx-material-keyboard/core';

import { AuthService, UserService, User } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: User[] = [];
  loading = false;
  error = '';
  hiddenUser = true;
  virtKeyboard = false;

  constructor(
    private router: Router,
    private keyboardService: MatKeyboardService,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    // reset login status
    this.authService.logout();
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
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

  select(_user: User) {
    this.loginForm.patchValue({userName: _user.username});
  }

  toggleUser() {
      this.hiddenUser = !this.hiddenUser;
  }

  toggleVirtKeyboard(_toggle: MatSlideToggleChange) {
      this.virtKeyboard = !this.virtKeyboard;
  }
}
