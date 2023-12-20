import { LazyElementsModule } from "@angular-extensions/elements";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosLibraryModule, LoaderInterceptor } from "@efaps/pos-library";
import { HotkeyModule } from "angular2-hotkeys";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorInterceptor, SameHeightDirective } from "./services/index";
import { PERSISTENCE } from "./services/local-storage-persistence";
import { SharedModule, TranslateLoaderFactory } from "./shared/shared.module";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, SameHeightDirective, ThemePickerComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LazyElementsModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    PosLibraryModule.forRoot({
      baseUrl: "/api",
      socketUrl: "/socket",
      persistence: PERSISTENCE,
    }),
    HotkeyModule.forRoot({
      cheatSheetDescription: "Presentar",
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    // temporal workaround to deactivate the LiveAnnouncer
    {
      provide: LiveAnnouncer,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
