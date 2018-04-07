import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material';

import { PosService } from '../../services/index';
import { Item } from '../../model/index';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  displayedColumns = ['quantity', 'productDesc', 'unitPrice', 'price', 'modify'];
  dataSource = new MatTableDataSource<Item>();


  constructor(private ticketSync: PosService) { }

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(_data => this.dataSource.data = _data);
  }

  addOne(_item: Item) {
    _item.quantity = _item.quantity + 1;
    this.syncTicket();
  }

  subtractOne(_item: Item) {
    _item.quantity = _item.quantity - 1;
    if (_item.quantity < 1) {
        const ticket = this.dataSource.data;
      if (ticket.includes(_item)) {
        const index = ticket.indexOf(_item);
        if (index > -1) {
          ticket[ticket.indexOf(_item)].quantity = 1;
          ticket.splice(index, 1);
        }
      }
    }
    this.syncTicket();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.dataSource.data);
  }
}
