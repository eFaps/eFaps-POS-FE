import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PrintService } from "@efaps/pos-library";

import { SuccessDialogComponent } from "./success-dialog.component";

describe("SuccessDialogComponent", () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessDialogComponent],
      providers: [
        { provide: PrintService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            document: {
              number: "Test",
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
