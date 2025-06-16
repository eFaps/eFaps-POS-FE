import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleChange, MatSlideToggle } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AuthService,
  Company,
  CompanyService,
  User,
  UserService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { MatCard, MatCardContent } from "@angular/material/card";
import { SvgIconComponent } from "angular-svg-icon";
import { NgClass } from "@angular/common";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { VirtKeyboardDirective } from "../services/virt-keyboard.directive";
import { MatButton } from "@angular/material/button";
import { MatButtonToggle } from "@angular/material/button-toggle";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";

@Component({
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [
        MatCard,
        MatCardContent,
        SvgIconComponent,
        NgClass,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        VirtKeyboardDirective,
        MatButton,
        MatSlideToggle,
        MatButtonToggle,
        MatKeyboardModule
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private companyService = inject(CompanyService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private workspaceService = inject(WorkspaceService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  private subscription: Subscription = new Subscription();
  companies: Company[] = [];
  users: User[] = [];
  loginForm: FormGroup;
  loading = false;
  hiddenUser = true;
  @LocalStorage() virtKeyboard = false;
  @ViewChild("pwd") pwdField!: ElementRef;

  showCompanySelection = false;

  constructor() {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.workspaceService.logout();
    if (this.companyService.hasCompany()) {
      this.setCompany(this.companyService.currentCompany);
      this.subscription.add(
        this.companyService.getCompanies().subscribe({
          next: (companies) => (this.companies = companies),
        }),
      );
    } else {
      this.subscription.add(
        this.companyService.getCompanies().subscribe({
          next: (companies) => {
            this.companies = companies;
            if (companies.length == 1) {
              this.setCompany(this.companies[0]);
            } else if (companies.length > 1) {
              this.showCompanySelection = true;
            } else {
              this.subscription.add(
                this.userService
                  .getUsers()
                  .subscribe((data) => (this.users = data)),
              );
            }
          },
        }),
      );
    }
  }

  login() {
    if (this.loginForm.status === "INVALID") {
      this.openSnackBar("LOGIN.INVALIDFORM");
    } else {
      this.loading = true;
      this.authService
        .login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe({
          next: (result) => {
            if (result === true) {
              this.router.navigate(["/"]);
            } else {
              this.openSnackBar("LOGIN.401");
              this.loading = false;
            }
          },
          error: (error) => {
            if (error.status && error.status === 401) {
              this.openSnackBar("LOGIN.401");
            }
          },
        });
    }
  }

  openSnackBar(key: string) {
    const msg = this.translateService.instant(key);
    this.snackBar.open(msg, "", {
      duration: 3000,
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
    this.users = [];
    this.companyService.setCurrentCompany(company);
    this.showCompanySelection = false;
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  showCompanies() {
    this.showCompanySelection = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
