import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { provideRouter } from "@angular/router";
import {
  AuthService,
  CompanyService,
  Permission,
  PosConfigToken,
  UserService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AngularSvgIconModule, SvgIconRegistryService } from "angular-svg-icon";
import {
  HotkeyModule,
  HotkeysCheatsheetComponent,
  HotkeysService,
} from "angular2-hotkeys";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { AppComponent } from "./app.component";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";

class AuthServiceStub {
  currentEvent = new Observable();
  hasPermission(...permissions: Permission[]): boolean {
    return false;
  }
  getCurrentUsername(): string {
    return "Bob";
  }
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable();
  getLanguage() {
    return "en";
  }
}
class TranslateServiceSub {
  use(_lang: string) {}
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}
class HotkeysServiceStub {
  add() {}
  cheatSheetToggle = new Observable();
}
class CompanyServiceStub {
  company = new Observable();
}

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HotkeyModule,
        AngularSvgIconModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MockComponent(ThemePickerComponent),
        MockPipe(TranslatePipe),
        AppComponent,
        HotkeysCheatsheetComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: TranslateService, useClass: TranslateServiceSub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: UserService, useValue: {} },
        { provide: HotkeysService, useClass: HotkeysServiceStub },
        { provide: CompanyService, useClass: CompanyServiceStub },
        {
          provide: SvgIconRegistryService,
          useClass: SvgIconRegistryServiceStub,
        },
        {
          provide: PosConfigToken,
          useValue: {
            order: "",
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
