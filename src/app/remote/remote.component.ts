import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { DocumentService, Payable, PosLibraryModule } from "@efaps/pos-library";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-remote",
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    PosLibraryModule,
    TranslateModule,
  ],
  templateUrl: "./remote.component.html",
  styleUrl: "./remote.component.scss",
})
export class RemoteComponent {
  private documentService = inject(DocumentService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  documentForm: FormGroup;
  payables: Payable[] = [];

  constructor() {
    this.documentForm = this.fb.group({
      number: [
        "",
        [Validators.required, Validators.pattern(/^[FB][A-Z\d]{3}-\d{4,}/)],
      ],
    });
  }

  retrieve() {
    const number = this.documentForm.value.number as string;
    if (number.startsWith("F")) {
      this.documentService.retrieveInvoices(number).subscribe({
        next: (invoice) => {
          this.payables = invoice;
          if (this.payables.length == 0) {
            this.snackBar.open("No se incontro niguna factura", undefined, {
              duration: 3000,
            });
          }
        },
      });
    } else if (number.startsWith("B")) {
      this.documentService.retrieveReceipts(number).subscribe({
        next: (reciepts) => {
          this.payables = reciepts;
          if (this.payables.length == 0) {
            this.snackBar.open("No se incontro niguna boleta", undefined, {
              duration: 3000,
            });
          }
        },
      });
    }
  }

  pull(type: string, payableOid: string) {
    if (type == "RECEIPT") {
      this.documentService.getReceiptByIdent(payableOid, true).subscribe({
        next: (receipt) => {
          this.router.navigate(["/credit-notes"], {
            queryParams: {
              sourceId: receipt.id,
              sourceType: receipt.type,
            },
          });
        },
      });
    }
  }
}
