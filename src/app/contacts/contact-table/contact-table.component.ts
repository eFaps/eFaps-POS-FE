import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  ConfigService,
  Contact,
  ContactService,
  PageRequest,
} from "@efaps/pos-library";
import { Subscription, merge } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

import { CONTACT_ACTIVATE_EMAIL } from "../../util/keys";
import { CreateContactDialogComponent } from "../create-contact-dialog/create-contact-dialog.component";

@Component({
  selector: "app-contact-table",
  templateUrl: "./contact-table.component.html",
  styleUrls: ["./contact-table.component.scss"],
})
export class ContactTableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  searchForm: FormGroup;
  subscription$ = new Subscription();
  useEmail: boolean = false;

  constructor(
    private configService: ConfigService,
    private contactService: ContactService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      search: [],
    });
  }

  ngOnInit() {
    this.subscription$.add(
      this.configService.getSystemConfig(CONTACT_ACTIVATE_EMAIL).subscribe({
        next: (value) => {
          this.useEmail = "true" === "" + value;
        },
      })
    );

    this.searchForm.valueChanges.pipe(debounceTime(400)).subscribe((input) => {
      this.dataSource.data = [];
      if (input.search) {
        merge(
          this.contactService.searchContacts(input.search, true),
          this.contactService.searchContacts(input.search, false)
        ).subscribe({
          next: (data) =>
            {
              this.dataSource.data = this.dataSource.data.concat(data);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
              ,
        });
      } else {
        this.loadContacts();
      }
    });
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadContacts()))
      .subscribe();
    this.loadContacts();
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
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
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
        this.paginator.length = page.totalElements;
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

  getPaginatorData(event: PageEvent) {
    console.log(event);
    return;
    this.contactService
      .getContacts({
        size: this.paginator.pageSize,
        page: this.paginator.pageIndex,
      })
      .subscribe({
        next: (page) => {
          this.dataSource.data = [];
          this.dataSource.data = page.content;
          this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;
          this.paginator.length = page.totalElements;
        },
      });
  }
}
