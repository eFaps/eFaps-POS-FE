import { Component, OnInit, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatList, MatListItem } from "@angular/material/list";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Balance,
  BalanceService,
  CalculatorService,
  ConfigService,
  CreditNote,
  DocItem,
  DocumentService,
  Payable,
  Payment,
  PaymentService,
  PaymentType,
  PosLibraryModule,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import clone from "just-clone";

import { DocumentComponent } from "../../shared/document/document.component";
import { AddPaymentDialogComponent } from "../add-payment-dialog/add-payment-dialog.component";
import { SuccessDialogComponent } from "../success-dialog/success-dialog.component";
import { CREDITNOTE_PERMITPARTIAL } from "src/app/util/keys";

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
  imports: [
    DocumentComponent,
    MatIconButton,
    MatIcon,
    MatButton,
    MatList,
    MatListItem,
    PosLibraryModule,
    TranslatePipe,
  ],
})
export class CreateCreditNoteComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private calculatorService = inject(CalculatorService);
  private documentService = inject(DocumentService);
  private balanceService = inject(BalanceService);
  private workspaceService = inject(WorkspaceService);
  private configService = inject(ConfigService);

  paymentService = inject(PaymentService);

  sourceDocument!: Payable;
  creditNote!: CreditNote;
  balance!: Balance;
  payments: Payment[] = [];
  PaymentType = PaymentType;
  workspaceOid!: string;
  print: boolean = false;
  permitPartial = false;
  validated = false;
  loading = false;

  ngOnInit(): void {
    this.balanceService.currentBalance.subscribe((balance) => {
      if (balance) {
        this.balance = balance;
      } else {
        this.snackBar.open("No hay una balance actual", undefined, {
          duration: 3000,
        });
        this.router.navigate(["/"]);
      }
    });
    this.workspaceService.currentWorkspace.subscribe((data) => {
      this.workspaceOid = data.oid;
      this.print = data.printCmds.some((x) => x.target === "TICKET");
    });
    this.route.queryParams.subscribe((params) => {
      const sourceId = params["sourceId"];
      const sourceType = params["sourceType"];
      switch (sourceType) {
        case "RECEIPT":
          this.documentService.getReceipt(sourceId).subscribe({
            next: (receipt) => {
              this.sourceDocument = receipt;
              this.validate();
              this.initCreditNote();
            },
          });
          break;
        case "INVOICE":
          this.documentService.getInvoice(sourceId).subscribe({
            next: (invoice) => {
              this.sourceDocument = invoice;
              this.validate();
              this.initCreditNote();
            },
          });
          break;
      }
    });
    this.configService
      .getSystemConfig<boolean>(CREDITNOTE_PERMITPARTIAL)
      .subscribe({
        next: (value) => {
          this.permitPartial = value;
        },
      });
  }

  validate() {
    this.documentService
      .validateForCreditNote({ payableOid: this.sourceDocument.oid!! })
      .subscribe({
        next: (response) => {
          this.validated = response.valid;
        },
      });
  }

  initCreditNote() {
    this.creditNote = {
      ...clone(this.sourceDocument),
      balanceOid: this.balance.oid ? this.balance.oid : this.balance.id,
      type: "CREDITNOTE",
      sourceDocOid: "",
      payments: [],
      id: null,
      oid: null,
      number: null,
    };
    this.sourceDocument.payments.forEach((payment) => {
      payment.amount = -payment.amount;
      this.payments.push(payment);
    });
  }

  createCreditNote() {
    this.loading = true;
    this.creditNote!.sourceDocOid = this.sourceDocument.oid
      ? this.sourceDocument.oid
      : this.sourceDocument.id!;
    this.creditNote!.payments = this.payments;
    this.creditNote!.items = this.creditNote!.items.filter(
      (item) => item.quantity > 0,
    );
    this.documentService.createCreditNote(this.creditNote!).subscribe({
      next: (doc) => {
        this.router.navigate(["/balance"]);
        this.showSuccess(doc);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  showSuccess(document: CreditNote) {
    this.dialog.open(SuccessDialogComponent, {
      width: "450px",
      disableClose: false,
      data: {
        document: document,
        currency: this.paymentService.currency,
        print: this.print,
        workspaceOid: this.workspaceOid,
      },
    });
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
  }

  openPaymentDialog() {
    let amount = this.sourceDocument.crossTotal;
    this.payments.forEach((payment) => {
      amount = amount + payment.amount;
    });
    let dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: amount,
    });
    dialogRef.afterClosed().subscribe({
      next: (info) => {
        this.payments.push({
          amount: -info.amount,
          currency: this.creditNote.currency,
          exchangeRate: this.creditNote!.exchangeRate,
          type: info.paymentType,
        });
      },
    });
  }

  itemClick(docItem: DocItem) {
    this.setItem(docItem);
    this.calculate();
  }

  private calculate() {
    this.calculatorService
      .calculateDoc(this.creditNote, this.sourceDocument.id!!)
      .subscribe({
        next: (doc) => {
          console.log(doc);
        },
      });
  }

  private setItem(docItem: DocItem) {
    const item = this.creditNote.items.find((item) => {
      return item.index == docItem.index;
    });
    if (item) {
      if (item.quantity == 0) {
        this.sourceDocument.items.find((sourceItem) => {
          item.quantity = sourceItem.quantity;
        });
      } else {
        item.quantity = 0;
      }
    }
  }

  reset() {
    this.payments = [];
    this.initCreditNote();
  }

  itemInvalid(item: DocItem): boolean {
    return item.quantity < 1;
  }

  btnIcon(item: DocItem): string {
    return item.quantity < 1 ? "add" : "cancel";
  }

  toggle() {
    this.creditNote.items.forEach((item) => {
      this.setItem(item);
    });
    this.calculate();
  }
}
