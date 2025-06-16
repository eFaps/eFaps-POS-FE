import { Component, inject } from "@angular/core";
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
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { PaymentType } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-add-payment-dialog",
  templateUrl: "./add-payment-dialog.component.html",
  styleUrls: ["./add-payment-dialog.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
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
