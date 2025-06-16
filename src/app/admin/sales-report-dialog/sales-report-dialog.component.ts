import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from "@angular/material/dialog";
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

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
