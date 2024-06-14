import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EmployeeService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { EmployeeDialogComponent } from "./employee-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

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
    declarations: [EmployeeDialogComponent],
    imports: [NoopAnimationsModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule],
    providers: [
        { provide: EmployeeService, useClass: EmployeeServiceStub },
        { provide: MatDialogRef, useValue: {} },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
                oid: "132.456",
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
