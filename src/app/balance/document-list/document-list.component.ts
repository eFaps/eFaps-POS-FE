import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentService, PayableHead } from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { DocumentDialogComponent } from "../document-dialog/document-dialog.component";

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.scss"],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  displayedColumns = [
    "type",
    "number",
    "date",
    "total",
    "status",
    "order",
    "cmd",
  ];
  dataSource = new MatTableDataSource<PayableHead>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private subscription$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      term: [],
    });
    this.subscription$.add(
      this.searchForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((newValue) => this.applyFilter(newValue.term))
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  applyFilter(_filterValue: string) {
    this.dataSource.data = [];
    this.documentService.findPayables(_filterValue).subscribe({
      next: (payables) => {
        this.dataSource.data = this.dataSource.data.concat(payables);
        this.dataSource.sort = this.sort;
      },
    });
  }

  show(payable: PayableHead) {
    this.dialog.open(DocumentDialogComponent, {
      data: {
        id: payable.id,
        type: payable.type,
      },
      maxHeight: "95vh",
    });
  }
}
