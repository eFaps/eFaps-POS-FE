import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgBusyModule } from 'ng-busy';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { Document } from '../model/index';
import { DocumentService, PaymentService, WorkspaceService } from '../services/index';
import { PaymentComponent } from './payment.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(_value: number, _currency: string): any {
    return 'something';
  }
}

@Pipe({ name: 'translateParams' })
class TranslateParamsPipeStub implements PipeTransform {
  transform(_value: number, _currency: string): any {
    return 'something';
  }
}

@Pipe({ name: 'posCurrency' })
class PosCurrencyPipeStub implements PipeTransform {
  transform(_value: number, _currency: string): any {
    return 'something';
  }
}

@Component({
  selector: 'app-cash',
  template: '<p>Cash</p>'
})
class MockCashComponent {
  @Input()
  protected change: number;
}

@Component({
  selector: 'app-card',
  template: '<p>Card</p>'
})
class MockCardComponent {
  @Input()
  protected change: number;
}

@Component({
  selector: 'app-free',
  template: '<p>Free</p>'
})
class MockFreeComponent {
  @Input()
  protected change: number;
}

@Component({
  selector: 'app-contact',
  template: '<p>Contact</p>'
})
class MockContactComponent {
}

@Component({
  selector: 'app-document',
  template: '<p>Contact</p>'
})
class MockDocumentComponent {
  @Input() document: Document;
}

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

fdescribe('PaymentComponent', () => {
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
        TranslatePipeStub,
        TranslateParamsPipeStub,
        PosCurrencyPipeStub,
        PaymentComponent,
        MockContactComponent,
        MockDocumentComponent,
        MockCardComponent,
        MockCashComponent,
        MockFreeComponent
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
