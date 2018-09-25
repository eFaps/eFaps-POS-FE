import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { MockComponent, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AuthService, WorkspaceService } from './services/index';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

class AuthServiceStub { }
class WorkspaceServiceStub {
  getLanguage() {
    return "en";
  }
}
class TranslateServiceSub {
  use(_lang) {}
}
class SvgIconRegistryServiceStub {
  loadSvg(): Observable<any> {
    return new Observable();
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularSvgIconModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceSub },
        { provide: SvgIconRegistryService, useClass: SvgIconRegistryServiceStub }
      ],
      declarations: [
        AppComponent,
        MockComponent(ThemePickerComponent),
        MockPipe(TranslatePipe)
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
