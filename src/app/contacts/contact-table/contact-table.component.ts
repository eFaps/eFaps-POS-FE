import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Contact, ContactService } from '@efaps/pos-library';
import { Subscription, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { CreateContactDialogComponent } from '../create-contact-dialog/create-contact-dialog.component';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'idType', 'idNumber'];
  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchForm: FormGroup;
  subscription$ = new Subscription();

  constructor(private contactService: ContactService, private dialog: MatDialog,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      'search': []
    });
    this.subscription$.add(this.contactService.getContacts()
      .subscribe({
        next: data => {
          this.dataSource.data = [];
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
        }
      }));
    this.searchForm.valueChanges.pipe(
      debounceTime(400))
      .subscribe(input => {
        this.dataSource.data = [];
        if (input.search) {
          merge(
            this.contactService.searchContacts(input.search, true),
            this.contactService.searchContacts(input.search, false)
          ).subscribe({
            next: data => this.dataSource.data = this.dataSource.data.concat(data)
          })
        } else {
          this.contactService.getContacts().subscribe({
            next: data => this.dataSource.data = data
          })
        }
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  createContact() {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.dataSource = new MatTableDataSource<Contact>();
        this.ngOnInit();
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
}
