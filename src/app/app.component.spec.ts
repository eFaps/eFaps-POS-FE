import { HttpClient } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
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

import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';
import { MaterialModule } from './material/material.module';
import {
  AdminService,
  AuthService,
  ConfigService,
  WorkspaceService
} from './services/index';
import { SharedModule } from './shared/shared.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
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
        WorkspaceService
      ],
      declarations: [
        AppComponent,
        ThemePickerComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
