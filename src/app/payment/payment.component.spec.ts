import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BusyDirective } from 'ng-busy';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { Document } from '../model/index';
import { BalanceService, DocumentService, PaymentService, PosCurrencyPipe, WorkspaceService } from '../services/index';
import { ContactComponent } from '../shared/contact/contact.component';
import { DocumentComponent } from '../shared/document/document.component';
import { CardComponent } from './card/card.component';
import { CashComponent } from './cash/cash.component';
import { FreeComponent } from './free/free.component';
import { PaymentComponent } from './payment.component';

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
      docTypes: []
    });
  });
}
class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}
class TranslateServiceStub { }

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
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe),
        MockComponent(ContactComponent),
        MockComponent(DocumentComponent),
        MockComponent(CardComponent),
        MockComponent(CashComponent),
        MockComponent(FreeComponent),
        MockDirective(BusyDirective),
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
