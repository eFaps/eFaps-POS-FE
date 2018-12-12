import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeContainerComponent } from './payment-type-container.component';

describe('PaymentTypeContainerComponent', () => {
  let component: PaymentTypeContainerComponent;
  let fixture: ComponentFixture<PaymentTypeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTypeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
