import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { TranslatePipe } from "@ngx-translate/core";

import { PaymentType } from "@efaps/pos-library";

@Component({
  selector: "app-add-payment-dialog",
  templateUrl: "./add-payment-dialog.component.html",
  styleUrls: ["./add-payment-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatIcon,
    TranslatePipe,
  ],
})
export class AddPaymentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef =
    inject<MatDialogRef<AddPaymentDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  paymentType = PaymentType;
  paymentTypes: string[] = [];
  paymentForm: FormGroup;
  constructor() {
    this.paymentTypes = Object.keys(this.paymentType).filter((f) =>
      isNaN(Number(f)),
    );
    this.paymentForm = this.fb.group({
      amount: [this.data, Validators.min(0.01)],
      paymentType: [, Validators.required],
    });
  }

  save() {
    this.dialogRef.close({
      amount: this.paymentForm.get("amount")!.value,
      paymentType: this.paymentForm.get("paymentType")!.value,
    });
  }
}
