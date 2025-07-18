import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  CompanyService,
  PosConfigToken,
  UserService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AngularSvgIconModule, SvgIconRegistryService } from "angular-svg-icon";
import { HotkeyModule, HotkeysService } from "angular2-hotkeys";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { AppComponent } from "./app.component";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";

class AuthServiceStub {}
class WorkspaceServiceStub {
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
}
describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HotkeyModule,
        RouterTestingModule,
        AngularSvgIconModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MockComponent(ThemePickerComponent),
        MockPipe(TranslatePipe),
        AppComponent,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: TranslateService, useClass: TranslateServiceSub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: UserService, useValue: {} },
        { provide: HotkeysService, useClass: HotkeysServiceStub },
        { provide: CompanyService, useValue: {} },
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
