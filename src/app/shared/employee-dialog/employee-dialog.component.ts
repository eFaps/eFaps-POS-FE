import { Component, OnInit, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee, EmployeeService } from "@efaps/pos-library";

@Component({
  selector: "app-employee-dialog",
  templateUrl: "./employee-dialog.component.html",
  styleUrls: ["./employee-dialog.component.scss"],
  standalone: false,
})
export class EmployeeDialogComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  dialogRef = inject<MatDialogRef<EmployeeDialogComponent>>(MatDialogRef);
  data = inject<EmployeeDialogData>(MAT_DIALOG_DATA);

  title = "";
  employees: Employee[] = [];
  employeeCtrl: FormControl<Employee | null>;
  selectedEmployee: Employee | undefined;

  constructor() {
    const data = this.data;

    this.employeeCtrl = new FormControl<Employee | null>(null);
    this.title = data.titel;
    if (data && data.employee) {
      this.employeeCtrl.patchValue(data.employee);
    }
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => (this.employees = employees),
    });
  }

  closeDialog() {
    this.dialogRef.close(
      this.employeeCtrl.value ? this.employeeCtrl.value : null,
    );
  }

  compareFunction(o1: any, o2: any) {
    return o1.oid == o2.oid;
  }
}

export interface EmployeeDialogData {
  titel: string;
  employee?: Employee | null;
}
