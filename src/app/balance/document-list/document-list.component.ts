import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort, MatSortHeader } from "@angular/material/sort";
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
import {
  DocumentService,
  PayableHead,
  PosLibraryModule,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { MatIconButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { TranslatePipe } from "@ngx-translate/core";
import { DocumentDialogComponent } from "../document-dialog/document-dialog.component";

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    PosLibraryModule,
    TranslatePipe,
  ],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private documentService = inject(DocumentService);
  private dialog = inject(MatDialog);

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
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  private subscription$ = new Subscription();

  constructor() {
    this.searchForm = this.fb.group({
      term: [],
    });
  }

  ngOnInit() {
    this.subscription$.add(
      this.searchForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((newValue) => this.applyFilter(newValue.term)),
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
