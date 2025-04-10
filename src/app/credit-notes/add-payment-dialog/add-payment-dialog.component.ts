import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PaymentType } from "@efaps/pos-library";

@Component({
  selector: "app-add-payment-dialog",
  templateUrl: "./add-payment-dialog.component.html",
  styleUrls: ["./add-payment-dialog.component.scss"],
  standalone: false,
})
export class AddPaymentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<AddPaymentDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  paymentType = PaymentType;
  paymentTypes: string[] = [];
  paymentForm: FormGroup;
  constructor() {
    this.paymentTypes = Object.keys(this.paymentType).filter((f) =>
      isNaN(Number(f)),
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
