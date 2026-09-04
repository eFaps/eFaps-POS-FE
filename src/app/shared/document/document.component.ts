import { DecimalPipe } from "@angular/common";
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatLine } from "@angular/material/grid-list";
import { MatIcon } from "@angular/material/icon";
import { MatList, MatListItem } from "@angular/material/list";
import { MatSort } from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Router } from "@angular/router";
import {
  AuthService,
  CreditNote,
  DocItem,
  Document,
  DocumentService,
  Employee,
  EmployeeRelationType,
  EmployeeService,
  Payable,
  Payment,
  Permission,
  PosLibraryModule,
  PrintService,
  PromoInfo,
  PromotionService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";

import { PartListRelationComponent } from "../part-list-relation/part-list-relation.component";
import { PrintDialogComponent } from "../print-dialog/print-dialog.component";
import { PromoDialogComponent } from "../promo-dialog/promo-dialog.component";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    PartListRelationComponent,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatList,
    MatListItem,
    MatLine,
    MatButton,
    DecimalPipe,
    PosLibraryModule,
    TranslatePipe,
  ],
})
export class DocumentComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private workspaceService = inject(WorkspaceService);
  private printService = inject(PrintService);
  private documentService = inject(DocumentService);
  private employeeService = inject(EmployeeService);
  private promotionService = inject(PromotionService);
  private matDialogRef = inject<MatDialogRef<DocumentComponent>>(MatDialogRef, {
    optional: true,
  });

  readonly permitPrint = input(false);
  readonly showContact = input(false);
  readonly permitCreditNote = input(false);
  readonly hideTitle = input<Boolean>();
  readonly showCmd = input<Boolean>();
  readonly document = model.required<Document>();

  constructor() {
    effect(() => {
      const doc = this.document();
      if (doc && doc.items) {
        this.dataSource.data = doc.items.sort((a, b) =>
          a.index < b.index ? -1 : 1,
        );
        this.dataSource.sort = this.sort;
        this.loadCreditNote();
        this.loadEmployeeRelations();
      } else {
        this.dataSource.data = [];
        this.creditNotes.set([]);
        this.employeeRelations = [];
      }
      if (this.showCmd()) {
        if (this.displayedColumns.length == 6) {
          this.displayedColumns.push("cmd");
        }
      } else if (this.displayedColumns.length == 7) {
        this.displayedColumns.pop();
      }
    });
  }

  creditNotes = signal<CreditNote[]>([]);
  sourceDoc = signal<Document | undefined>(undefined);

  displayedColumns = [
    "index",
    "quantity",
    "childQuantity",
    "productDesc",
    "crossUnitPrice",
    "crossPrice",
  ];

  dataSource = new MatTableDataSource<DocItem>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  private workspaceOid: string = "";

  hasCopyPrintCmd = false;

  employeeRelations: EmployeeRelationDisplay[] = [];
  promoInfo: PromoInfo | undefined;

  markInvalid = input<(item: DocItem) => boolean>();
  btnIcon = input<(item: DocItem) => string>();
  onItemClick = output<DocItem>();

  ngOnInit() {
    if (this.matDialogRef && !this.document()) {
      this.router.navigate(["/pos"]);
    }
    this.workspaceService.currentWorkspace.subscribe({
      next: (workspace) => {
        if (workspace) {
          this.workspaceOid = workspace.oid;
          this.hasCopyPrintCmd = workspace.printCmds.some(
            (x) => x.target === "COPY",
          );
        }
      },
    });
    this.promotionService
      .getPromotionInfoForDocument(this.document()?.id!!)
      .subscribe({
        next: (promoInfo) => (this.promoInfo = promoInfo),
      });
  }

  isPayable(): boolean {
    return "payments" in this.document();
  }

  get payments(): Payment[] {
    return this.isPayable() ? (<Payable>this.document()).payments : [];
  }

  loadCreditNote() {
    const doc = this.document();
    if (doc.type != "CREDITNOTE") {
      this.documentService
        .getCreditNotes4SourceDocument(doc.oid ? doc.oid : doc.id!)
        .subscribe({
          next: (docs) => {
            this.creditNotes.set(docs);
          },
        });
    } else {
      this.creditNotes.set([]);
      if ((<CreditNote>doc).sourceDocOid) {
        this.documentService
          .getPayableByIdent((<CreditNote>doc).sourceDocOid)
          .subscribe({
            next: (doc) => {
              if (doc) {
                this.sourceDoc.set(doc);
              }
            },
            error: (_err: any) => {
              console.log(_err);
            },
          });
      }
    }
  }

  printCopy() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printCopy(this.workspaceOid, this.document()),
    });
  }

  createCreditNote() {
    this.router.navigate(["/credit-notes"], {
      queryParams: {
        sourceId: this.document().id,
        sourceType: this.document().type,
      },
    });
    this.matDialogRef?.close();
  }

  get showCreditNoteBtn(): boolean {
    return (
      this.document().type != "CREDITNOTE" &&
      this.document().type != "TICKET" &&
      this.permitCreditNote() &&
      this.authService.hasPermission(Permission.ADMIN) &&
      this.creditNotes().length == 0
    );
  }

  loadEmployeeRelations() {
    if (this.document().employeeRelations) {
      this.document().employeeRelations!!.forEach((entry) => {
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

  showPromoInfo() {
    this.dialog.open(PromoDialogComponent, {
      data: { promoInfo: this.promoInfo },
    });
  }

  btnClick(docItem: DocItem) {
    this.onItemClick.emit(docItem);
  }

  isInvalid(item: DocItem) {
    const ft = this.markInvalid();
    if (ft) {
      return ft(item);
    } else {
      return false;
    }
  }

  getBtnIcon(item: DocItem) {
    const icon = this.btnIcon();
    if (icon) {
      return icon(item);
    } else {
      return "cancel";
    }
  }
}

export interface EmployeeRelationDisplay {
  employee?: Employee;
  type: EmployeeRelationType;
}
