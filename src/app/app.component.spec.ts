import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';

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
  use(_lang) {

  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceSub }
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
