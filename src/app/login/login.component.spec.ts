import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatKeyboardModule, MatKeyboardService } from '@ngx-material-keyboard/core';
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG
} from '@ngx-translate/core';

import { HttpLoaderFactory } from '../app.module';
import { MaterialModule } from '../material/material.module';
import { AuthService, ConfigService, VirtKeyboardDirective, UserService, WorkspaceService} from '../services/index';
import { LoginComponent } from './login.component';

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
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        AuthService,
        ConfigService,
        HttpClient,
        HttpHandler,
        MatKeyboardService,
        UserService,
        WorkspaceService
      ],
      declarations: [ VirtKeyboardDirective, LoginComponent ]
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
