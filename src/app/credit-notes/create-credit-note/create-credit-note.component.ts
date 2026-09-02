import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Component, OnInit, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatList, MatListItem } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
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
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { CREDITNOTE_PERMITPARTIAL } from "src/app/util/keys";
interface Reason {
  key: string;
  label: string;
  partial: boolean;
}

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DocumentComponent,
    MatIconButton,
    MatIcon,
    MatButton,
    MatList,
    MatListItem,
    MatStepperModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDividerModule,
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
  private formBuilder = inject(FormBuilder);

  reasonFormGroup: FormGroup = this.formBuilder.group({
    creditNoteReason: ["", Validators.required],
  });

  paymentService = inject(PaymentService);

  _creditNoteReasons: Reason[] = [
    {
      key: "01",
      label: "Anulación de la operación",
      partial: false,
    },
    {
      key: "05",
      label: "Devolución por ítem",
      partial: true,
    },
  ];

  sourceDocument!: Payable;
  creditNote!: CreditNote;
  balance!: Balance;
  payment = true;
  payments = signal<Payment[]>([]);
  PaymentType = PaymentType;
  workspaceOid!: string;
  print: boolean = false;
  permitPartial = false;
  emitable = false;
  loading = false;

  activatePartial = signal<boolean>(false);

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
              this.canBeEmited();
              this.initCreditNote();
            },
          });
          break;
        case "INVOICE":
          this.documentService.getInvoice(sourceId).subscribe({
            next: (invoice) => {
              this.sourceDocument = invoice;
              this.canBeEmited();
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

  private canBeEmited() {
    this.documentService
      .validateForCreditNote({ payableOid: this.sourceDocument.oid!! })
      .subscribe({
        next: (response) => {
          this.emitable = response.valid;
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

      this.payments.update((current) => {
        current.push(payment);
        return [...current];
      });
    });
  }

  createCreditNote() {
    var total = this.creditNote.crossTotal;
    var paymentAmount = this.payments().reduce(
      (accumulator, current) => accumulator + current.amount,
      0,
    );

    if (this.payment && total + paymentAmount != 0) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Verificar",
          msg: `Suma de pagos (${paymentAmount}) y monto de la Nota de Credito (${total}) no coinciden!`,
          cancel: "Regresar",
          confirm: "Emitir Nota de Credito",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.createInternal();
        }
      });
    } else {
      this.createInternal();
    }
  }

  private createInternal() {
    this.loading = true;
    this.creditNote!.sourceDocOid = this.sourceDocument.oid
      ? this.sourceDocument.oid
      : this.sourceDocument.id!;
    if (this.payment) {
      this.creditNote!.payments = this.payments();
    }
    this.creditNote!.items = this.creditNote!.items.filter(
      (item) => item.quantity > 0,
    );
    this.creditNote!.creditReason =
      this.reasonFormGroup.value.creditNoteReason.key;
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
    const index: number = this.payments().indexOf(_payment);
    if (index !== -1) {
      this.payments.update((current) => {
        current.splice(index, 1);
        return [...current];
      });
    }
  }

  openPaymentDialog() {
    let amount = this.sourceDocument.crossTotal;
    this.payments().forEach((payment) => {
      amount = amount + payment.amount;
    });
    let dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: amount,
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        this.payments.update((current) => {
          current.push({
            amount: -data.amount,
            currency: this.creditNote.currency,
            exchangeRate: this.creditNote!.exchangeRate,
            type: data.paymentType,
          });
          return [...current];
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
          this.payments.update((current) => {
            if (current.length == 1) [(current[0].amount = -doc.crossTotal)];
            return [...current];
          });
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
    this.payments.set([]);
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

  get creditNoteReasons(): Reason[] {
    return this.permitPartial
      ? this._creditNoteReasons
      : this._creditNoteReasons.filter((reason) => reason.partial == false);
  }

  onSelectionChange(selectionChange: StepperSelectionEvent) {
    this.activatePartial.set(
      this.permitPartial && this.reasonFormGroup.value.creditNoteReason.partial,
    );
  }

  get valid(): boolean {
    return this.emitable && !this.loading;
  }
}
