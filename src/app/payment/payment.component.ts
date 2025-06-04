import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  Balance,
  BalanceService,
  ConfigService,
  Contact,
  ContactService,
  DocStatus,
  Document,
  DocumentService,
  DocumentType,
  Employee,
  EmployeeRelationType,
  EmployeeService,
  IdentificationType,
  Invoice,
  Payment,
  PaymentService,
  PaymentType,
  PrintService,
  Receipt,
  Ticket,
  WorkspaceFlag,
  WorkspaceService,
  hasFlag,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { PartialObserver, Subject, Subscription, debounceTime } from "rxjs";

import { PAYABLE_ACTIVATENOTE, PAYMENT_REQUIRE } from "src/app/util/keys";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { DocumentComponent } from "../shared/document/document.component";
import {
  EmployeeDialogComponent,
  EmployeeDialogData,
} from "../shared/employee-dialog/employee-dialog.component";
import { NoteDialogComponent } from "../shared/note-dialog/note-dialog.component";
import { PrintDialogComponent } from "../shared/print-dialog/print-dialog.component";
import { DiscountComponent } from "./discount/discount.component";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
  standalone: false,
})
export class PaymentComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private workspaceService = inject(WorkspaceService);
  private documentService = inject(DocumentService);
  private balanceService = inject(BalanceService);
  private printService = inject(PrintService);
  private contactService = inject(ContactService);
  private employeeService = inject(EmployeeService);
  private configService = inject(ConfigService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  paymentService = inject(PaymentService);

  @ViewChild(MatTabGroup, { static: true }) tabGroup!: MatTabGroup;
  @ViewChild(DocumentComponent, { static: true })
  documentComponent!: DocumentComponent;
  @LocalStorage() selectedPaymentTypeItem: number = 0;
  DocumentType = DocumentType;
  PaymentType = PaymentType;
  document!: Document;
  payments: Payment[] = [];
  total = 0;
  change = 0;
  docType: DocumentType = DocumentType.RECEIPT;
  docTypes: DocumentType[] = [];
  contact: Contact | undefined;
  workspaceOid!: string;
  balance!: Balance;
  note: string | undefined;
  showContact = false;
  permitToggleContact = true;
  allowPrintPreliminary = true;
  allowAssignSeller = true;
  activateNote = true;
  submitDisabled = false;
  requirePrintJob = false;

  private subscriptions$ = new Subscription();
  private printTicket = false;
  private _seller: Employee | null = null;
  private requirePayment = false;
  private submitClicked = new Subject<void>();

  constructor() {
    this.submitClicked
      .pipe(debounceTime(200))
      .subscribe(() => this.createDocument());
  }

  ngOnInit() {
    this.subscriptions$.add(
      this.paymentService.currentDocument.subscribe((_doc) => {
        this.document = _doc;
        this.documentComponent.document = _doc;
        if (this.document) {
          if (this.document.contactOid) {
            this.showContact = true;
            if ((this.document as any).contact) {
              this.contact = (this.document as any).contact;
            } else {
              this.contactService
                .getContact(this.document.contactOid)
                .subscribe({
                  next: (contact) => (this.contact = contact),
                });
            }
          }
          if (this.document.employeeRelations) {
            const relations = this.document.employeeRelations.filter(
              (relation) => {
                return relation.type == EmployeeRelationType.SELLER;
              },
            );
            if (relations.length > 0) {
              this.subscriptions$.add(
                this.employeeService
                  .getEmployee(relations[0].employeeOid)
                  .subscribe({
                    next: (employee) => (this._seller = employee),
                  }),
              );
            }
          }
        }
      }),
    );
    this.subscriptions$.add(
      this.paymentService.currentPayments.subscribe(
        (_payments) => (this.payments = _payments),
      ),
    );
    this.subscriptions$.add(
      this.balanceService.currentBalance.subscribe(
        (_balance) => (this.balance = _balance),
      ),
    );
    this.subscriptions$.add(
      this.paymentService.currentTotal.subscribe((_total) => {
        this.total = _total;
        let payableAmount = 0;
        if (this.document) {
          payableAmount = this.document.payableAmount
            ? this.document.payableAmount
            : this.document.crossTotal;
        }
        this.change = this.document ? _total - payableAmount : _total;
      }),
    );
    this.subscriptions$.add(
      this.workspaceService.currentWorkspace.subscribe((workspace) => {
        this.workspaceOid = workspace.oid;
        this.allowAssignSeller = hasFlag(workspace, WorkspaceFlag.assignSeller);
        this.allowPrintPreliminary = workspace.printCmds.some(
          (x) => x.target === "PRELIMINARY",
        );
        this.requirePrintJob =
          hasFlag(workspace.flags, WorkspaceFlag.jobOnPayment) &&
          workspace.printCmds.some((x) => x.target === "JOB");
        this.printTicket = workspace.printCmds.some(
          (x) => x.target === "TICKET",
        );
        this.docTypes = [];
        workspace.docTypes.forEach((_value) => {
          if (_value != DocumentType.CREDITNOTE) {
            this.docTypes.push(_value);
          }
        });
      }),
    );
    this.subscriptions$.add(
      this.configService.getSystemConfig<boolean>(PAYMENT_REQUIRE).subscribe({
        next: (value) => {
          if (value != null) {
            this.requirePayment = value;
          } else {
            this.requirePayment = false;
          }
        },
      }),
    );
    this.subscriptions$.add(
      this.configService
        .getSystemConfig<boolean>(PAYABLE_ACTIVATENOTE)
        .subscribe({
          next: (value) => {
            if (value != null) {
              this.activateNote = value;
            } else {
              this.activateNote = false;
            }
          },
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  validate() {
    let ret = true;
    if (DocumentType.INVOICE === this.docType && this.contact == null) {
      this.snackBar.open(
        this.translateService.instant("PAYMENT.NOCONTACTMSG"),
        "",
        { duration: 3000 },
      );
      ret = false;
    } else if (
      DocumentType.INVOICE === this.docType &&
      this.contact &&
      this.contact.idType != IdentificationType.RUC
    ) {
      this.snackBar.open(
        "Solo se puede generar facturas con un número de RUC válido.",
        "",
        { duration: 3000 },
      );
      ret = false;
    } else if (
      DocumentType.RECEIPT === this.docType &&
      this.contact == null &&
      this.document.crossTotal > 700
    ) {
      this.snackBar.open(
        this.translateService.instant("PAYMENT.NOCONTACTMSG"),
        "",
        { duration: 3000 },
      );
      ret = false;
    }
    if (this.requirePayment && this.change < 0) {
      this.snackBar.open("Falta de pago", "", { duration: 3000 });
      ret = false;
    }

    return ret;
  }

  submitDocument() {
    this.submitDisabled = true;
    this.submitClicked.next();
  }

  private createDocument() {
    if (this.validate()) {
      if (this.change !== 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: "300px",
          data: {
            title: this.translateService.instant("PAYMENT.CONFIRM-CLOSE"),
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.executeCreateDocument();
          }
        });
      } else {
        this.executeCreateDocument();
      }
    } else {
      this.submitDisabled = false;
    }
  }

  private executeCreateDocument() {
    if (this.change !== 0) {
      this.payments.push({
        type: PaymentType.CHANGE,
        amount: this.change,
        currency: this.document.currency,
        exchangeRate: this.document.exchangeRate,
      });
    }
    const payable = {
      id: null,
      oid: null,
      number: null,
      currency: this.document.currency,
      exchangeRate: this.document.exchangeRate,
      items: this.document.items,
      status: DocStatus.OPEN,
      payments: this.payments,
      netTotal: this.document.netTotal,
      crossTotal: this.document.crossTotal,
      payableAmount: this.document.payableAmount,
      taxes: this.document.taxes,
      contactOid: this.contact
        ? this.contact.oid
          ? this.contact.oid
          : this.contact.id
        : null,
      workspaceOid: this.workspaceOid,
      balanceOid: this.balance.oid ? this.balance.oid : this.balance.id,
      discount: this.document.discount,
      employeeRelations: this.seller
        ? [{ employeeOid: this.seller.oid, type: EmployeeRelationType.SELLER }]
        : undefined,
      note: this.note,
    };

    switch (this.docType) {
      case DocumentType.RECEIPT:
        this.documentService
          .createReceipt(this.document.id!, <Receipt>payable)
          .subscribe(this.getObserver<Receipt>(DocumentType.RECEIPT));
        break;
      case DocumentType.INVOICE:
        this.documentService
          .createInvoice(this.document.id!, <Invoice>payable)
          .subscribe(this.getObserver<Invoice>(DocumentType.INVOICE));
        break;
      case DocumentType.TICKET:
        this.documentService
          .createTicket(this.document.id!, <Ticket>payable)
          .subscribe(this.getObserver<Ticket>(DocumentType.TICKET));
        break;
    }
  }

  private getObserver<T extends Document>(
    type: DocumentType,
  ): PartialObserver<T> {
    return {
      next: (doc) => {
        this.showSuccess(doc, type).afterClosed().subscribe({
          next: () => { this.router.navigate(["/pos"]); }
        });
        this.paymentService.reset();
      },
      error: (response) => {
        if (response && response.error && response.error.status) {
          this.snackBar.open(
            this.translateService.instant("PAYMENT." + response.error.status),
            "",
            { duration: 3000 },
          );
        } else {
          this.snackBar.open(
            this.translateService.instant("PAYMENT.UNKNOWNERROR"),
            "",
            { duration: 3000 },
          );
        }
      },
    };
  }

  showSuccess(document: Document, docType: DocumentType): MatDialogRef<SuccessDialogComponent> {
    return this.dialog.open(SuccessDialogComponent, {
      width: "450px",
      disableClose: false,
      data: {
        document: document,
        docType: docType,
        change: this.change,
        currency: this.paymentService.currency,
        print: this.printTicket,
        workspaceOid: this.workspaceOid,
        order: this.document,
        job: this.requirePrintJob,
      },
    });
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
    this.paymentService.updatePayments(this.payments);
  }

  selectContact(_contact: Contact) {
    this.contact = _contact;
  }

  toggleContact() {
    this.showContact = !this.showContact;
  }

  setDocType(_docTypeIdx: DocumentType) {
    if (DocumentType.INVOICE === _docTypeIdx) {
      this.showContact = true;
      this.permitToggleContact = false;
    } else {
      this.permitToggleContact = true;
    }
  }

  printPreliminary() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printPreliminary(
        this.workspaceOid,
        this.document,
      ),
    });
  }

  selectPaymentType(_index: number) {
    this.selectedPaymentTypeItem = _index;
  }

  showDiscount() {
    if ("discount" in this.document) {
      this.dialog
        .open(DiscountComponent, {
          data: this.document,
        })
        .afterClosed()
        .subscribe({
          next: () => {
            this.paymentService.calculateTotals(this.payments);
          },
        });
    }
  }

  assignSeller() {
    const data: EmployeeDialogData = {
      titel: "Assignar Vendedor",
      employee: this.seller,
    };
    let ref = this.dialog.open(EmployeeDialogComponent, {
      width: "400px",
      data,
    });
    ref.afterClosed().subscribe({
      next: (employee) => {
        if (employee) {
          this.seller = employee;
        } else if (employee === null) {
          this.seller = null;
        }
      },
    });
  }

  set seller(seller: Employee | null) {
    if (seller == null) {
      this._seller = null;
    } else {
      this._seller = seller;
    }
  }

  get seller(): Employee | null {
    return this._seller;
  }

  addNote() {
    let ref = this.dialog.open(NoteDialogComponent, {
      width: "400px",
      data: this.note,
    });
    ref.afterClosed().subscribe({
      next: (content) => {
        if (content) {
          this.note = content;
        } else if (content === null) {
          this.note = undefined;
        }
      },
    });
  }
}
