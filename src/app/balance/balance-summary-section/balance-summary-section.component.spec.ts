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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
