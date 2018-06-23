import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgBusyModule } from 'ng-busy';
import { MockComponent, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { Document } from '../model/index';
import { DocumentService, PaymentService, WorkspaceService, PosCurrencyPipe } from '../services/index';
import { ContactComponent } from '../shared/contact/contact.component';
import { PaymentComponent } from './payment.component';
import { CardComponent } from './card/card.component';
import { DocumentComponent } from '../shared/document/document.component';
import { CashComponent } from './cash/cash.component';
import { FreeComponent } from './free/free.component';
import { TranslatePipe } from '@ngx-translate/core';

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

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        NgBusyModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
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
