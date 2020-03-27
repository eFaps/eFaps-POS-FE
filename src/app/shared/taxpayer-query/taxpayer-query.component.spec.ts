import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerQueryComponent } from './taxpayer-query.component';

describe('TaxpayerQueryComponent', () => {
  let component: TaxpayerQueryComponent;
  let fixture: ComponentFixture<TaxpayerQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxpayerQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
