/// <reference types="@angular/localize" />

import { LazyElementsModule } from "@angular-extensions/elements";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  enableProdMode,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { LoaderInterceptor, PosLibraryModule } from "@efaps/pos-library";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { HotkeyModule } from "angular2-hotkeys";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { ErrorInterceptor } from "./app/services/index";
import { PERSISTENCE } from "./app/services/local-storage-persistence";
import { TranslateLoaderFactory } from "./app/shared/shared.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      LazyElementsModule,
      AngularSvgIconModule.forRoot(),
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
    ),
    provideZonelessChangeDetection(),
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
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" },
    // temporal workaround to deactivate the LiveAnnouncer
    {
      provide: LiveAnnouncer,
      useValue: {},
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.log(err));
