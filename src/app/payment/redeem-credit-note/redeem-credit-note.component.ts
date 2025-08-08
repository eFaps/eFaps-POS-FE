import { Component, inject } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CreditNote,
  Currency,
  DocumentService,
  Payment,
  PaymentService,
  PaymentType,
  PosLibraryModule,
  UtilsService,
} from "@efaps/pos-library";
import { TranslateModule } from "@ngx-translate/core";

import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-redeem-credit-note",
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatCardModule,
    MatListModule,
    PosLibraryModule,
    TranslateModule,
  ],
  templateUrl: "./redeem-credit-note.component.html",
  styleUrl: "./redeem-credit-note.component.scss",
})
export class RedeemCreditNoteComponent extends PaymentForm {
  documentService = inject(DocumentService);
  private snackBar = inject(MatSnackBar);

  documentForm: any;
  creditNotes: CreditNote[] = [];

  constructor() {
    const paymentService = inject(PaymentService);
    const utilsService = inject(UtilsService);
    const fb = inject(UntypedFormBuilder);

    super(paymentService, utilsService, fb);
    this.documentForm = this.fb.group({
      number: [
        "",
        [Validators.required, Validators.pattern(/^[FB][A-Z\d]{3}-\d{4,}/)],
      ],
    });
  }

  getPayment(): Payment {
    return {
      type: PaymentType.REDEEM_CREDITNOTE,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
    };
  }

  retrieve() {
    const number = this.documentForm.value.number as string;

    this.documentService.retrieveCreditNotes(number).subscribe({
      next: (creditNotes) => {
        this.creditNotes = creditNotes;
        if (this.creditNotes.length == 0) {
          this.snackBar.open(
            "No se incontro niguna nota de credito",
            undefined,
            {
              duration: 3000,
            },
          );
        }
      },
      error: () => {
        this.snackBar.open(
          "No se puede buscar por nota de creditos",
          undefined,
          {
            duration: 3000,
          },
        );
      },
    });
  }

  addRedeemPayment(creditNote: CreditNote) {
    if (creditNote) {
      const amount = creditNote.crossTotal;
      let payment = this.getPayment();
      payment.redeemDocOid =
        creditNote.oid == null ? creditNote.id!! : creditNote.oid;
      payment.amount = amount;
      this.payments.push(payment);
      this.paymentService.updatePayments(this.payments);
      this.creditNotes = [];
    }
  }
}
