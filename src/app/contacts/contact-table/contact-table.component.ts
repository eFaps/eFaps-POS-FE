import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Contact } from '../../model/index';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {
    displayedColumns = ['name', 'taxNumber'];
    dataSource = new MatTableDataSource<Contact>();
    @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

}
