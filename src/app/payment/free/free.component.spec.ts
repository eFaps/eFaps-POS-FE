import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import {
  AuthService,
  ConfigService,
  DocumentService,
  PaymentService,
  PosService,
  UtilsService,
  WorkspaceService
} from '@efaps/pos-library';
import { KeypadComponent } from '../../shared/keypad/keypad.component';
import { FreeComponent } from './free.component';

class AuthServiceStub { }
class ConfigServiceStub { }
class DocumentServiceStub { }
class PosServiceStub { }
class UtilsServiceStub {
  getCurrencySymbol(som) {
    return 'PEN';
  }
}
class PaymentServiceStub {
  currentPayments = new Observable(observer => {
    observer.next([]);
  });
  currentDocument = new Observable(observer => {
    observer.next([]);
  });
  currentTotal = new Observable(observer => {
    observer.next([]);
  });
}
class WorkspaceServiceStub { }

describe('FreeComponent', () => {
  let component: FreeComponent;
  let fixture: ComponentFixture<FreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        FreeComponent,
        MockPipe(TranslatePipe),
        MockComponent(KeypadComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
