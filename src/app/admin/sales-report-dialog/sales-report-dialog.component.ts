import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-sales-report-dialog",
    templateUrl: "./sales-report-dialog.component.html",
    styleUrl: "./sales-report-dialog.component.scss",
    imports: [
        CdkScrollable,
        MatDialogContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
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
