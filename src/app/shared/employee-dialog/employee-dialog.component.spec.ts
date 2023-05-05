import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EmployeeService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { EmployeeDialogComponent } from "./employee-dialog.component";

class EmployeeServiceStub {
  getEmployees() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("EmployeeDialogComponent", () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
      ],
      declarations: [EmployeeDialogComponent],
      providers: [
        { provide: EmployeeService, useClass: EmployeeServiceStub },
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
