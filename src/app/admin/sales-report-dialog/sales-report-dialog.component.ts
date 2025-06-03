import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-sales-report-dialog",
  standalone: false,
  templateUrl: "./sales-report-dialog.component.html",
  styleUrl: "./sales-report-dialog.component.scss",
})
export class SalesReportDialogComponent {
  reportForm: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0, 0, 0);

    this.reportForm = fb.group({
      date: [date, [Validators.required]],
    });
  }
}
