import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CashEntryDialogComponent } from "./cash-entry-dialog.component";

describe("CashEntryDialogComponent", () => {
  let component: CashEntryDialogComponent;
  let fixture: ComponentFixture<CashEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashEntryDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
