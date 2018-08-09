import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { BalanceService, DocumentService } from '../../services';
import { BalancePaymentListComponent } from './balance-payment-list.component';

class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}

class DocumentServiceStub { }

describe('BalancePaymentListComponent', () => {
  let component: BalancePaymentListComponent;
  let fixture: ComponentFixture<BalancePaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub }
      ],
      declarations: [
        BalancePaymentListComponent,
        MockPipe(TranslatePipe)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
