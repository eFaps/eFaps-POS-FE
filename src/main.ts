/// <reference types="@angular/localize" />

import { enableProdMode, provideZonelessChangeDetection, importProvidersFrom } from "@angular/core";
import { platformBrowser, bootstrapApplication } from "@angular/platform-browser";


import { environment } from "./environments/environment";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, HttpClient } from "@angular/common/http";
import { ErrorInterceptor } from "./app/services/index";
import { LoaderInterceptor, PosLibraryModule } from "@efaps/pos-library";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { provideAnimations } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyElementsModule } from "@angular-extensions/elements";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AppRoutingModule } from "./app/app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { PERSISTENCE } from "./app/services/local-storage-persistence";
import { HotkeyModule } from "angular2-hotkeys";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateLoaderFactory } from "./app/shared/shared.module";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, ReactiveFormsModule, LazyElementsModule, AngularSvgIconModule.forRoot(), AppRoutingModule, MatButtonModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, PosLibraryModule.forRoot({
            baseUrl: "/api",
            socketUrl: "/socket",
            persistence: PERSISTENCE,
        }), HotkeyModule.forRoot({
            cheatSheetDescription: "Presentar",
        }), TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateLoaderFactory,
                deps: [HttpClient],
            },
        })),
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
    ]
})
  .catch((err) => console.log(err));
