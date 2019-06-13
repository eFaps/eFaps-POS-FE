import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';

import { User, Company } from '../model/index';
import { AuthService, CompanyService, UserService, WorkspaceService } from '../services/index';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  companies: Company[] = [];
  users: User[] = [];
  loginForm: FormGroup;
  loading = false;
  hiddenUser = true;
  @LocalStorage() virtKeyboard = false;
  @ViewChild('pwd', { static: false }) pwdField: ElementRef;

  showCompanySelection = false;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.createForm();
    // reset login status
    this.authService.logout();
    this.workspaceService.logout();
    if (this.companyService.hasCompany()) {
      this.showCompanySelection = false;
      this.subscription.add(this.userService.getUsers().subscribe(data => this.users = data));
    } else {
      this.subscription.add(this.companyService.getCompanies()
        .subscribe(
          {
            next: companies => {
              this.companies = companies;
              this.showCompanySelection = companies.length > 1;
            }
          }
        ));
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  login() {
    if (this.loginForm.status === 'INVALID') {
      this.snackBar.open(this.translateService.instant('LOGIN.INVALIDFORM'), '', {
        duration: 3000
      });
    } else {
      this.loading = true;
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe((result) => {
          if (result === true) {
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(this.translateService.instant('LOGIN.401'), '', {
              duration: 3000
            });
            this.loading = false;
          }
        }, error => {
          if (error.status && error.status === 401) {
            this.snackBar.open(this.translateService.instant('LOGIN.401'), '', {
              duration: 3000
            });
          }
        });
    }
  }

  select(_user: User) {
    this.loginForm.patchValue({ userName: _user.username });
    this.pwdField.nativeElement.focus();
  }

  toggleUser() {
    this.hiddenUser = !this.hiddenUser;
  }

  toggleVirtKeyboard(_toggle: MatSlideToggleChange) {
    this.virtKeyboard = !this.virtKeyboard;
  }

  setCompany(company: Company) {
    this.companyService.setCurrentCompany(company);
    this.showCompanySelection = false;
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
