import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { BalanceService, DocumentService } from '../../services';
import { BalanceDocumentListComponent } from '../balance-document-list/balance-document-list.component';
import { BalancePaymentListComponent } from '../balance-payment-list/balance-payment-list.component';
import { BalanceComponent } from './balance.component';

class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}

class DocumentServiceStub {
  getDocuments4Balance() {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

class TranslateServiceStub { }

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ],
      declarations: [
        BalanceComponent,
        MockComponent(BalanceDocumentListComponent),
        MockComponent(BalancePaymentListComponent),
        MockPipe(TranslatePipe)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
