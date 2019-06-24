import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { LocalStorage } from 'ngx-store';
import { Subscription } from 'rxjs';

import { Company, User } from '../model/index';
import { AuthService, CompanyService, UserService, WorkspaceService } from '../services/index';

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
    private translateService: TranslateService) {
    globalCacheBusterNotifier.next();
  }

  ngOnInit() {
    this.createForm();
    // reset login status
    this.authService.logout();
    this.workspaceService.logout();
    if (this.companyService.hasCompany()) {
      this.showCompanySelection = false;
      this.subscription.add(this.userService.getUsers().subscribe(data => this.users = data));
      this.subscription.add(this.companyService.getCompanies()
        .subscribe(
          {
            next: companies => this.companies = companies
          }
        ));
    } else {
      this.subscription.add(this.companyService.getCompanies()
        .subscribe(
          {
            next: companies => {
              this.companies = companies;
              if (companies.length > 1) {
                this.showCompanySelection = true;
              } else {
                this.subscription.add(this.userService.getUsers()
                  .subscribe(data => this.users = data));
              }
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
      this.openSnackBar('LOGIN.INVALIDFORM');
    } else {
      this.loading = true;
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe({
          next: result => {
            if (result === true) {
              this.router.navigate(['/']);
            } else {
              this.openSnackBar('LOGIN.401');
              this.loading = false;
            }
          },
          error: error => {
            if (error.status && error.status === 401) {
              this.openSnackBar('LOGIN.401');
            }
          }
        });
    }
  }

  openSnackBar(key: string) {
    const msg = this.translateService.instant(key);
    this.snackBar.open(msg, '', {
      duration: 3000
    });
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

  showCompanies() {
    this.showCompanySelection = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
