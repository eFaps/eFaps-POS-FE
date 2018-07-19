import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePaymentListComponent } from './balance-payment-list.component';

describe('BalancePaymentListComponent', () => {
  let component: BalancePaymentListComponent;
  let fixture: ComponentFixture<BalancePaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancePaymentListComponent ]
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
