import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportDialogComponent } from './sales-report-dialog.component';

describe('SalesReportDialogComponent', () => {
  let component: SalesReportDialogComponent;
  let fixture: ComponentFixture<SalesReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
