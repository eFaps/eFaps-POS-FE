import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgBusyDirective } from 'ng-busy';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import {
  BalanceService,
  DocumentService,
  PaymentService,
  PosCurrencyPipe,
  PrintService,
  WorkspaceService
} from '../services/index';
import { ContactComponent } from '../shared/contact/contact.component';
import { DocumentComponent } from '../shared/document/document.component';
import { PaymentComponent } from './payment.component';
import { PaymentTypeProviderService } from '../services/payment-type-provider.service';
import { PaymentTypeContainerComponent } from './payment-type-container/payment-type-container.component';
import { PaymentTypeItem } from './payment-type-item';
import { of } from 'rxjs';

class DocumentServiceStub { }
class PaymentServiceStub {
  currentDocument = new Observable(observer => {
    observer.next({});
  });
  currentPayments = new Observable(observer => {
    observer.next([]);
  });
  currentTotal = new Observable(observer => {
    observer.next({});
  });
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable(observer => {
    observer.next({
      docTypes: [],
      printCmds: []
    });
  });
}
class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}
class TranslateServiceStub { }
class PrintServiceStub { }
class LocalStorageServiceStub { }
class PaymentTypeProviderServiceStub {
  getPaymentTypeItems(): Observable<PaymentTypeItem[]> {
    return of([]);
  }
}

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: LocalStorageService, useClass: LocalStorageServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: PaymentTypeProviderService, useClass: PaymentTypeProviderServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PrintService, useClass: PrintServiceStub }
      ],
      declarations: [
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe),
        MockComponent(ContactComponent),
        MockComponent(DocumentComponent),
        MockComponent(PaymentTypeContainerComponent),
        MockDirective(NgBusyDirective),
        PaymentComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
