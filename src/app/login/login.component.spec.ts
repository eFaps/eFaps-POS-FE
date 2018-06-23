import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatKeyboardModule, MatKeyboardService } from '@ngx-material-keyboard/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { User } from '../model/index';
import { AuthService, ConfigService, UserService, VirtKeyboardDirective, WorkspaceService } from '../services/index';
import { LoginComponent } from './login.component';

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
class ConfigServiceStub {

}
class TranslateServiceStub {

}
class WorkspaceServiceStub {
  logout() { }
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
        MatKeyboardModule
      ],
      providers: [
        MatKeyboardService,
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useValue: routerSpy }
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
