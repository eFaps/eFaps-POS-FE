import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-sales-report-dialog",
  standalone: false,
  templateUrl: "./sales-report-dialog.component.html",
  styleUrl: "./sales-report-dialog.component.scss",
})
export class SalesReportDialogComponent {
  reportForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.reportForm = fb.group({
      date: [new Date(), [Validators.required]],
    });
  }
}
