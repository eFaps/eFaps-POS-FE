import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Employee, EmployeeService } from "@efaps/pos-library";

@Component({
  selector: "app-employee-dialog",
  templateUrl: "./employee-dialog.component.html",
  styleUrls: ["./employee-dialog.component.scss"],
})
export class EmployeeDialogComponent implements OnInit {
  employees: Employee[] = [];
  employee: FormControl<string | null>;
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employee = new FormControl("");
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => (this.employees = employees),
    });
  }
}
