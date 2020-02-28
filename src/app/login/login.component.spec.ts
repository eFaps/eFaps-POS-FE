import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, CompanyService, ConfigService, User, UserService, WorkspaceService, Company } from '@efaps/pos-library';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { VirtKeyboardDirective } from '../services';
import { LoginComponent } from './login.component';
import { MatKeyboardModule, MatKeyboardService } from 'angular-onscreen-material-keyboard';

class MatKeyboardServiceStub {}
class CompanyServiceStub {
  hasCompany(): boolean {
    return false
  }
  getCompanies(): Observable<Company[]> {
    return new Observable();
  }
}
class UserServiceStub {
  public getUsers(): Observable<User[]> {
    return new Observable(observer => {
      observer.next([{
        username: 'demo',
        firstName: 'string',
        surName: 'string',
      }]);
      observer.complete();
    });
  }
}
class AuthServiceStub {
  logout() { }
}
class ConfigServiceStub { }
class TranslateServiceStub { }
class WorkspaceServiceStub {
  logout() { }
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}

const routerSpy = jasmine.createSpyObj('Router', ['pos']);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialModule,
        MatKeyboardModule,
        AngularSvgIconModule,
        HttpClientModule,
      ],
      providers: [
        { provide: CompanyService, useClass: CompanyServiceStub },
        { provide: MatKeyboardService, useClass: MatKeyboardServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: SvgIconRegistryService, useClass: SvgIconRegistryServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: LiveAnnouncer, useValue: {} },
      ],
      declarations: [VirtKeyboardDirective,
        LoginComponent,
        MockPipe(TranslatePipe)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
