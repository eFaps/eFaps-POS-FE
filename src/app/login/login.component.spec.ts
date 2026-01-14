import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
  MatKeyboardModule,
  MatKeyboardService,
} from "@efaps/angular-onscreen-material-keyboard";
import {
  AuthService,
  Company,
  CompanyService,
  ConfigService,
  User,
  UserService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AngularSvgIconModule, SvgIconRegistryService } from "angular-svg-icon";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";
import { vi } from "vitest";

import { LoginComponent } from "./login.component";

const user = {
  username: "demo",
  firstName: "Firstname",
  surName: "Lastname",
};

class MatKeyboardServiceStub {}
class CompanyServiceStub {
  hasCompany(): boolean {
    return false;
  }
  getCompanies(): Observable<Company[]> {
    return new Observable((observer) => {
      observer.next([]);
      observer.complete();
    });
  }
}
class UserServiceStub {
  public getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      observer.next([user]);
      observer.complete();
    });
  }
}
class AuthServiceStub {
  logout() {}
  login(_userName: string, password: string) {
    return new Observable((observer) => {
      observer.next(password === "password");
      observer.complete();
    });
  }
}

class ConfigServiceStub {}
class TranslateServiceStub {
  instant(key: String) {}
}
class WorkspaceServiceStub {
  logout() {}
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}
class RouterStub {
  navigate(path: string[]) {}
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularSvgIconModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatKeyboardModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        LoginComponent,
        MockPipe(TranslatePipe),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CompanyService, useClass: CompanyServiceStub },
        { provide: MatKeyboardService, useClass: MatKeyboardServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub },
        {
          provide: SvgIconRegistryService,
          useClass: SvgIconRegistryServiceStub,
        },
        { provide: LiveAnnouncer, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  describe("Standard Login", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should show a user card", () => {
      const baseDe: DebugElement = fixture.debugElement;
      const cardDe = baseDe.query(By.css(".pos-usercard"));
      expect(cardDe).toBeTruthy();
      const div = baseDe.query(By.css("form > div"));
      expect(div.nativeElement.hidden).toBe(true);
    });

    it("should show the name of the user on the user card", () => {
      const baseDe: DebugElement = fixture.debugElement;
      const cardContent = baseDe.query(By.css(".mat-mdc-card-content"));
      expect(cardContent.nativeElement.textContent.trim()).toBe(
        "Firstname Lastname",
      );
    });

    it("should show an input if hiddenUser is clicked and hides the card", () => {
      const baseDe: DebugElement = fixture.debugElement;
      const hiddenUserToggle = baseDe.query(By.css(".hiddenUser"));
      hiddenUserToggle.triggerEventHandler("change", null);

      fixture.detectChanges();
      const input = baseDe.query(By.css("input[formcontrolname=userName]"));

      expect(input).toBeTruthy();
      const div = baseDe.query(By.css("form > div"));
      expect(div.nativeElement.hidden).toBe(false);
      const cardGrid = baseDe.query(By.css(".pos-usergrid"));
      expect(cardGrid.nativeElement.style.display).toBe("none");
    });

    it("navegates to route if login successfull", inject(
      [Router],
      (router: Router) => {
        const spy = vi.spyOn(router, "navigate");
        console.log(spy);
        const baseDe: DebugElement = fixture.debugElement;
        //select card
        const card = baseDe.query(By.css(".pos-usercard"));
        card.triggerEventHandler("click", user);
        // imput password
        const input = baseDe.query(By.css("input[type=password]"));
        input.nativeElement.value = "password";
        input.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        // click the submit button
        const button = baseDe.query(By.css("button"));
        button.nativeElement.click();

        // const url = vi.mocked(spy).mock.calls[0].args[0];
        //expect(url).toEqual(["/"]);
      },
    ));

    it("shows snackBar if form invalid", inject(
      [MatSnackBar],
      (snackBar: MatSnackBar) => {
        vi.spyOn(snackBar, "open");
        const baseDe: DebugElement = fixture.debugElement;
        //select card
        const card = baseDe.query(By.css(".pos-usercard"));
        card.triggerEventHandler("click", user);

        const button = baseDe.query(By.css("button"));
        button.nativeElement.click();
        expect(snackBar.open).toHaveBeenCalled();
      },
    ));

    it("shows snackBar if login invalid", inject(
      [MatSnackBar],
      (snackBar: MatSnackBar) => {
        vi.spyOn(snackBar, "open");
        const baseDe: DebugElement = fixture.debugElement;
        //select card
        const card = baseDe.query(By.css(".pos-usercard"));
        card.triggerEventHandler("click", user);
        // imput password
        const input = baseDe.query(By.css("input[type=password]"));
        input.nativeElement.value = "invalid";
        input.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        const button = baseDe.query(By.css("button"));
        button.nativeElement.click();
        expect(snackBar.open).toHaveBeenCalled();
      },
    ));
  });
});
