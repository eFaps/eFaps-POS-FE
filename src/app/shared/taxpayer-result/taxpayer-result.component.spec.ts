import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerResultComponent } from './taxpayer-result.component';

describe('TaxpayerResultComponent', () => {
  let component: TaxpayerResultComponent;
  let fixture: ComponentFixture<TaxpayerResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxpayerResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
