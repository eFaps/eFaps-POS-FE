import { Component, Input, OnInit, ViewChild, Optional } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import {
  AuthService,
  CreditNote,
  DocItem,
  Document,
  DocumentService,
  PrintService,
  Permission,
  Payable,
  WorkspaceService,
  Payment,
  Currency,
  DocStatus,
  EmployeeRelationType,
  EmployeeService,
  Employee,
} from "@efaps/pos-library";

import { PrintDialogComponent } from "../print-dialog/print-dialog.component";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {
  displayedColumns = [
    "index",
    "quantity",
    "childQuantity",
    "productDesc",
    "crossUnitPrice",
    "crossPrice",
  ];
  dataSource = new MatTableDataSource<DocItem>();
  _document: Document;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  private workspaceOid: string = "";
  @Input() permitPrint = false;
  @Input() showContact = false;
  hasCopyPrintCmd = false;
  @Input() permitCreditNote = false;
  creditNotes: CreditNote[] = [];
  sourceDoc: Document | undefined;
  employeeRelations: EmployeeRelationDisplay[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private printService: PrintService,
    private documentService: DocumentService,
    private employeeService: EmployeeService,
    @Optional() private matDialogRef?: MatDialogRef<DocumentComponent>
  ) {
    this._document = {
      type: "ORDER",
      id: null,
      oid: null,
      number: null,
      currency: Currency.PEN,
      items: [],
      status: DocStatus.OPEN,
      netTotal: 0,
      crossTotal: 0,
      exchangeRate: 0,
      payableAmount: 0,
      taxes: [],
      discount: null,
    };
  }

  ngOnInit() {
    if (this.matDialogRef && !this._document) {
      this.router.navigate(["/pos"]);
    }
    this.workspaceService.currentWorkspace.subscribe({
      next: (workspace) => {
        this.workspaceOid = workspace.oid;
        this.hasCopyPrintCmd = workspace.printCmds.some(
          (x) => x.target === "COPY"
        );
      },
    });
  }

  @Input()
  set document(document: Document) {
    this._document = document;
    if (document && document.items) {
      this.dataSource.data = this._document.items.sort((a, b) =>
        a.index < b.index ? -1 : 1
      );
      this.dataSource.sort = this.sort;
      this.loadCreditNote();
      this.loadEmployeeRelations();
    } else {
      this.dataSource.data = [];
      this.creditNotes = [];
      this.employeeRelations = [];
    }
  }

  get document(): Document {
    return this._document;
  }

  isPayable(): boolean {
    return "payments" in this._document;
  }

  get payments(): Payment[] {
    return this.isPayable() ? (<Payable>this._document).payments : [];
  }

  loadCreditNote() {
    if (this._document.type != "CREDITNOTE") {
      this.documentService
        .getCreditNotes4SourceDocument(
          this._document.oid ? this._document.oid : this._document.id!
        )
        .subscribe({
          next: (docs) => {
            this.creditNotes = docs;
          },
        });
    } else {
      this.creditNotes = [];
      if ((<CreditNote>this._document).sourceDocOid) {
        this.documentService
          .getPayableByIdent((<CreditNote>this._document).sourceDocOid)
          .subscribe({
            next: (doc) => {
              if (doc) {
                this.sourceDoc = doc;
              }
              error: (_err: any) => {
                console.log(_err);
              };
            },
          });
      }
    }
  }

  printCopy() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printCopy(this.workspaceOid, this._document),
    });
  }

  createCreditNote() {
    this.router.navigate(["/credit-notes"], {
      queryParams: {
        sourceId: this.document.id,
        sourceType: this.document.type,
      },
    });
    this.matDialogRef?.close();
  }

  get showCreditNoteBtn(): boolean {
    return (
      this.permitCreditNote &&
      this.authService.hasPermission(Permission.ADMIN) &&
      this._document.type != "CREDITNOTE" &&
      this.creditNotes.length == 0
    );
  }

  loadEmployeeRelations() {
    if (this._document.employeeRelations) {
      this._document.employeeRelations.forEach((entry) => {
        const relation: EmployeeRelationDisplay = {
          type: entry.type,
        };
        this.employeeService.getEmployee(entry.employeeOid).subscribe({
          next: (employee) => (relation.employee = employee),
        });
        this.employeeRelations.push(relation);
      });
    }
  }

  hasEmployeeRelations(): boolean {
    return this.employeeRelations.length > 0;
  }

  isChild(docItem: DocItem) {
    return docItem?.parentIdx != null;
  }
}

export interface EmployeeRelationDisplay {
  employee?: Employee;
  type: EmployeeRelationType;
}
