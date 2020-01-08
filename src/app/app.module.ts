import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule, SERVER_URL } from 'angular-svg-icon';
import { HotkeyModule } from 'angular2-hotkeys';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ErrorInterceptor, SameHeightDirective } from './services/index';
import { SharedModule, TranslateLoaderFactory } from './shared/shared.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    SameHeightDirective,
    ThemePickerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularSvgIconModule,
    AppRoutingModule,
    SharedModule,
    HotkeyModule.forRoot({
      cheatSheetDescription: 'Presentar',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: SERVER_URL,
      useValue: environment.electron ? __dirname : '',
    },
    // temporal woraround to deactivate the LiveAnnouncer
    {
      provide: LiveAnnouncer,
      useValue: {}
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
