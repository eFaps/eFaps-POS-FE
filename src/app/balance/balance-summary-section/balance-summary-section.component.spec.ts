import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSummarySectionComponent } from './balance-summary-section.component';

describe('BalanceSummarySectionComponent', () => {
  let component: BalanceSummarySectionComponent;
  let fixture: ComponentFixture<BalanceSummarySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceSummarySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummarySectionComponent);
    component = fixture.componentInstance;
    component.detail = {
      documentCount: 1,
      paymentCount: 1,
      netTotal: 10,
      crossTotal: 10,
      paymentInfos: [],
      taxEntries: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
