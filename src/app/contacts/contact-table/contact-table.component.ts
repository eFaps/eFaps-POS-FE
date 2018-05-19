import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Contact } from '../../model/index';
import { ContactService } from '../../services/index';
import { CreateContactDialogComponent } from '../create-contact-dialog/create-contact-dialog.component';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {
  displayedColumns = ['name', 'taxNumber'];
  dataSource = new MatTableDataSource<Contact>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactService, private dialog: MatDialog) { }


  ngOnInit() {
    this.contactService.getContacts()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  createContact() {
    this.dialog.open(CreateContactDialogComponent, {
      width: '450px'
    });
  }

}
