import { LiveAnnouncer } from "@angular/cdk/a11y";
import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  Company,
  CompanyService,
  ConfigService,
  User,
  UserService,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import {
  MatKeyboardModule,
  MatKeyboardService
} from "angular-onscreen-material-keyboard";
import { AngularSvgIconModule, SvgIconRegistryService } from "angular-svg-icon";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { VirtKeyboardDirective } from "../services";
import { LoginComponent } from "./login.component";

class MatKeyboardServiceStub {}
class CompanyServiceStub {
  hasCompany(): boolean {
    return false;
  }
  getCompanies(): Observable<Company[]> {
    return new Observable(observer => {
      observer.next([]);
      observer.complete();
    });
  }
}
class UserServiceStub {
  public getUsers(): Observable<User[]> {
    return new Observable(observer => {
      observer.next([
        {
          username: "demo",
          firstName: "Firstname",
          surName: "Lastname"
        }
      ]);
      observer.complete();
    });
  }
}
class AuthServiceStub {
  logout() {}
}
class ConfigServiceStub {}
class TranslateServiceStub {}
class WorkspaceServiceStub {
  logout() {}
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}

const routerSpy = jasmine.createSpyObj("Router", ["pos"]);

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularSvgIconModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatKeyboardModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CompanyService, useClass: CompanyServiceStub },
        { provide: MatKeyboardService, useClass: MatKeyboardServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        {
          provide: SvgIconRegistryService,
          useClass: SvgIconRegistryServiceStub
        },
        { provide: Router, useValue: routerSpy },
        { provide: LiveAnnouncer, useValue: {} }
      ],
      declarations: [
        VirtKeyboardDirective,
        LoginComponent,
        MockPipe(TranslatePipe)
      ]
    }).compileComponents();
  }));

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
      const cardContent = baseDe.query(By.css(".mat-card-content"));
      expect(cardContent.nativeElement.textContent.trim()).toBe(
        "Firstname Lastname"
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
  });
});
