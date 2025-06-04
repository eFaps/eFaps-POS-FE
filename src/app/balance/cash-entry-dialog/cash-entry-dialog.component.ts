import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Currency } from "@efaps/pos-library";
import { EnumValues } from "enum-values";

@Component({
  selector: "app-cash-entry-dialog",
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./cash-entry-dialog.component.html",
  styleUrl: "./cash-entry-dialog.component.scss",
})
export class CashEntryDialogComponent {
  private dialogRef =
    inject<MatDialogRef<CashEntryDialogComponent>>(MatDialogRef);
  private fb = inject(FormBuilder);
  cashEntryForm: FormGroup;
  currencies: string[];

  constructor() {
    this.currencies = EnumValues.getNames(Currency);

    this.cashEntryForm = this.fb.group({
      type: [undefined, [Validators.required]],
      currency: [undefined, [Validators.required]],
      amount: ["", Validators.required],
    });
  }

  submit() {
    this.dialogRef.close(this.cashEntryForm.value);
  }
}
