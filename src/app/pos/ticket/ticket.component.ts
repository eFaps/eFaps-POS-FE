import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Decimal } from 'decimal.js';

import { Item } from '../../model/index';
import { PosService } from '../../services/index';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  displayedColumns = ['quantity', 'productDesc', 'unitPrice', 'price', 'modify'];
  dataSource = new MatTableDataSource<Item>();
  currentCurrency = '';
  @Input() multiplier: number;
  @Output() multiplierClick = new EventEmitter<any>();

  constructor(private posService: PosService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(_data => this.dataSource.data = _data);
    this.posService.currentCurrency.subscribe(_data => this.currentCurrency = _data);
  }

  add(item: Item) {
    item.quantity = new Decimal(item.quantity).plus(this.getQuantity()).toNumber();
    this.syncTicket();
    this.multiplierClick.emit();
  }

  subtract(item: Item) {
    item.quantity = new Decimal(item.quantity).minus(this.getQuantity()).toNumber();
    if (item.quantity < 1) {
      const ticket = this.dataSource.data;
      if (ticket.includes(item)) {
        const index = ticket.indexOf(item);
        if (index > -1) {
          ticket[ticket.indexOf(item)].quantity = 1;
          ticket.splice(index, 1);
        }
      }
    }
    this.syncTicket();
    this.multiplierClick.emit();
  }

  syncTicket() {
    this.posService.changeTicket(this.dataSource.data);
  }

  private getQuantity(): Decimal {
    return new Decimal(this.multiplier > 0 ? this.multiplier : 1);
  }
}
