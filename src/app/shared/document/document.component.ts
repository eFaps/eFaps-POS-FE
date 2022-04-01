import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Optional,
  AfterContentInit,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import {
  DocItem,
  Document,
  PrintService,
  WorkspaceService,
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
    "productDesc",
    "crossUnitPrice",
    "crossPrice",
  ];
  dataSource = new MatTableDataSource<DocItem>();
  _document: Document;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private workspaceOid: string;
  @Input() permitPrint = false;
  hasCopyPrintCmd = false;
  @Input() permitCreditNote = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private workspaceService: WorkspaceService,
    private printService: PrintService,
    @Optional() private matDialogRef?: MatDialogRef<DocumentComponent>
  ) {}

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
    } else {
      this.dataSource.data = [];
    }
  }

  get document(): Document {
    return this._document;
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
    this.matDialogRef.close();
  }

  get showCreditNoteBtn(): boolean {
    return this.permitCreditNote && this._document.type != "CREDITNOTE"
  }
}
