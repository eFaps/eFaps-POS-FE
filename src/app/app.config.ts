import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZonelessChangeDetection } from "@angular/core";
import { BalanceService, LoaderInterceptor, PosLibraryModule } from "@efaps/pos-library";
import { provideNgxLocalstorage } from "ngx-localstorage";
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyElementsModule } from "@angular-extensions/elements";
import { AngularSvgIconModule } from "angular-svg-icon";
import { HotkeyModule } from "angular2-hotkeys";
import { PERSISTENCE } from "@app/services/local-storage-persistence";
import { provideTranslateService } from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { ErrorInterceptor } from "@app/services";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "@app/app.routes";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxLocalstorage({
      prefix: environment.storagePrefix,
    }),
    importProvidersFrom(
       FormsModule,
      ReactiveFormsModule,
      LazyElementsModule,
      AngularSvgIconModule.forRoot(),
          PosLibraryModule.forRoot({
        baseUrl: "/api",
        socketUrl: "/socket",
        persistence: PERSISTENCE,
      }),
      HotkeyModule.forRoot({
        cheatSheetDescription: "Presentar",
      }),
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: "./assets/i18n/",
      }),
    }),
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
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
    provideAppInitializer(() => {
      inject(BalanceService);
    })
  ]
};
