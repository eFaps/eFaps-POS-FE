import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { PosService, Item } from '../../services/index';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
    displayedColumns = ['productOid', 'description'];
    dataSource = new MatTableDataSource();
    

  constructor(private ticketSync: PosService) { }

  ngOnInit() {
      this.ticketSync.currentTicket.subscribe(data => this.dataSource.data = data);
  }

}
