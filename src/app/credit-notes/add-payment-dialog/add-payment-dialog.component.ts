import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { PaymentType } from "@efaps/pos-library";

@Component({
  selector: "app-add-payment-dialog",
  templateUrl: "./add-payment-dialog.component.html",
  styleUrls: ["./add-payment-dialog.component.scss"],
})
export class AddPaymentDialogComponent {
  paymentType = PaymentType;
  paymentTypes: string[] = [];
  paymentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paymentTypes = Object.keys(this.paymentType).filter((f) =>
      isNaN(Number(f))
    );
    this.paymentForm = this.fb.group({
      amount: [this.data, Validators.min(0)],
      paymentType: [],
    });
  }

  save() {
    this.dialogRef.close({
      amount: this.paymentForm.get("amount")!.value,
      paymentType: this.paymentForm.get("paymentType")!.value,
    });
  }
}
