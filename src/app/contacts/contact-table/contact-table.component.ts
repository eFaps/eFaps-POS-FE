import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Contact } from '../../model/index';
import { ContactService } from '../../services/index';
import { CreateContactDialogComponent } from '../create-contact-dialog/create-contact-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription, merge } from 'rxjs';

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
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      }));

    this.searchForm.valueChanges.pipe(
      debounceTime(400))
      .subscribe(data => {
        this.dataSource.data = [];
        merge(
          this.contactService.searchContacts(data.search, true),
          this.contactService.searchContacts(data.search, false)
        ).subscribe({
          next: data => this.dataSource.data = this.dataSource.data.concat(data)
        })
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
