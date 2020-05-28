import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfigService, Contact, ContactService } from "@efaps/pos-library";
import { Subscription, merge } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { CONTACT_ACTIVATE_EMAIL } from "../../util/keys";
import { CreateContactDialogComponent } from "../create-contact-dialog/create-contact-dialog.component";

@Component({
  selector: "app-contact-table",
  templateUrl: "./contact-table.component.html",
  styleUrls: ["./contact-table.component.scss"],
})
export class ContactTableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchForm: FormGroup;
  subscription$ = new Subscription();
  useEmail: boolean = false;

  constructor(
    private configService: ConfigService,
    private contactService: ContactService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [],
    });
    this.subscription$.add(
      this.contactService.getContacts().subscribe({
        next: (data) => {
          this.dataSource.data = [];
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
        },
      })
    );
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
            (this.dataSource.data = this.dataSource.data.concat(data)),
        });
      } else {
        this.contactService.getContacts().subscribe({
          next: (data) => (this.dataSource.data = data),
        });
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
