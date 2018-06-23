import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
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
} from '../../services/index';
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
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
        MockPipe(TranslatePipe)
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
