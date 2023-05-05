import { LazyElementsModule } from "@angular-extensions/elements";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosLibraryModule } from "@efaps/pos-library";
import { HotkeyModule } from "angular2-hotkeys";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule, SERVER_URL } from "angular-svg-icon";

import { environment } from "../environments/environment";
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
    // temporal workaround to deactivate the LiveAnnouncer
    {
      provide: LiveAnnouncer,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
