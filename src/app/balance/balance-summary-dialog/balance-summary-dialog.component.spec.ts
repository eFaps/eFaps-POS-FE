import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSummaryDialogComponent } from './balance-summary-dialog.component';

describe('BalanceSummaryDialogComponent', () => {
  let component: BalanceSummaryDialogComponent;
  let fixture: ComponentFixture<BalanceSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
