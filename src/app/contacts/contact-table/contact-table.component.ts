import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
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
  ConfigService,
  Contact,
  ContactService,
  PageRequest,
} from "@efaps/pos-library";
import { Subscription, merge } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { TranslatePipe } from "@ngx-translate/core";
import { CONTACT_ACTIVATE_EMAIL } from "../../util/keys";
import { CreateContactDialogComponent } from "../create-contact-dialog/create-contact-dialog.component";

@Component({
  selector: "app-contact-table",
  templateUrl: "./contact-table.component.html",
  styleUrls: ["./contact-table.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    TranslatePipe,
  ],
})
export class ContactTableComponent implements OnInit, OnDestroy {
  private configService = inject(ConfigService);
  private contactService = inject(ContactService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private changeDetectorRefs = inject(ChangeDetectorRef);

  dataSource = new MatTableDataSource<Contact>();
  _paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  searchForm: FormGroup;
  subscription$ = new Subscription();
  useEmail: boolean = false;

  constructor() {
    this.searchForm = this.fb.group({
      search: [],
    });
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(paginator: MatPaginator) {
    this._paginator = paginator;
    merge(this.sort.sortChange, this._paginator.page)
      .pipe(tap(() => this.loadContacts()))
      .subscribe();
    this.loadContacts();
  }

  ngOnInit() {
    this.subscription$.add(
      this.configService
        .getSystemConfig<boolean>(CONTACT_ACTIVATE_EMAIL)
        .subscribe({
          next: (value) => {
            this.useEmail = value;
          },
        }),
    );

    this.searchForm.valueChanges.pipe(debounceTime(400)).subscribe((input) => {
      this.dataSource.data = [];
      if (input.search) {
        merge(
          this.contactService.searchContacts(input.search, true),
          this.contactService.searchContacts(input.search, false),
        ).subscribe({
          next: (data) => {
            this.dataSource.data = this.dataSource.data.concat(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this._paginator;
          },
        });
      } else {
        this.loadContacts();
      }
    });
  }

  get displayedColumns() {
    return this.useEmail
      ? ["name", "idType", "idNumber", "email"]
      : ["name", "idType", "idNumber"];
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  loadContacts() {
    var pageRequest: PageRequest = {
      size: this._paginator.pageSize,
      page: this._paginator.pageIndex,
    };
    if (this.sort.active) {
      pageRequest.sort = [this.sort.active + "," + this.sort.direction];
    }
    this.contactService.getContacts(pageRequest).subscribe({
      next: (page) => {
        this.dataSource.data = [];
        this.dataSource.paginator = null;
        this.dataSource.sort = null;
        this.dataSource.data = page.content;
        this._paginator.length = page.totalElements;
        this.changeDetectorRefs.detectChanges();
      },
    });
  }

  createContact() {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, {
      width: "450px",
    });
    dialogRef.afterClosed().subscribe((_result) => {
      if (_result) {
        this.dataSource = new MatTableDataSource<Contact>();
        this.ngOnInit();
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
}
