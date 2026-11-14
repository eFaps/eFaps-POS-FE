import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
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
import { DateTime } from "luxon";

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
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    provideLuxonDateAdapter({
      parse: {
        dateInput: "d/L/yy",
      },
      display: {
        dateInput: "dd/LL/yyyy",
        monthYearLabel: "MMM yyyy",
        dateA11yLabel: "dd/LL/yyyy",
        monthYearA11yLabel: "dd/LL/yyyy",
      },
    }),
  ],
})
export class SalesReportDialogComponent {
  reportForm: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.reportForm = fb.group({
      date: [DateTime.now(), [Validators.required]],
    });
  }
}
