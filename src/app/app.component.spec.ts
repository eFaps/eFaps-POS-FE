import { HttpClientModule } from "@angular/common/http";
import { TestBed, async } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  PosConfigToken,
  WorkspaceService
} from "@efaps/pos-library";
import { HotkeyModule, HotkeysService } from "@giakki/angular2-hotkeys";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AngularSvgIconModule, SvgIconRegistryService } from "angular-svg-icon";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { AppComponent } from "./app.component";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";

class AuthServiceStub { }
class WorkspaceServiceStub {
  getLanguage() {
    return "en";
  }
}
class TranslateServiceSub {
  use(_lang) { }
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}
class HotkeysServiceStub {
  add() { }
}
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HotkeyModule,
        RouterTestingModule,
        AngularSvgIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: HotkeysService, useClass: HotkeysServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceSub },
        {
          provide: SvgIconRegistryService,
          useClass: SvgIconRegistryServiceStub
        },
        {
          provide: PosConfigToken,
          useValue: {
            order: ""
          }
        }
      ],
      declarations: [
        AppComponent,
        MockComponent(ThemePickerComponent),
        MockPipe(TranslatePipe)
      ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
