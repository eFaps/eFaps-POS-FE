import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { EmployeeDialogComponent } from "./employee-dialog.component";

describe("EmployeeDialogComponent", () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            oid: "132.456",
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
