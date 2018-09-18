import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitOrderDialogComponent } from './split-order-dialog.component';

describe('SplitOrderDialogComponent', () => {
  let component: SplitOrderDialogComponent;
  let fixture: ComponentFixture<SplitOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
