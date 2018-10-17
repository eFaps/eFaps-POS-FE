import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

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

  add(_item: Item) {
    _item.quantity = _item.quantity + this.getQuantity();
    this.syncTicket();
    this.multiplierClick.emit();
  }

  subtract(_item: Item) {
    _item.quantity = _item.quantity - this.getQuantity();
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
    this.multiplierClick.emit();
  }

  syncTicket() {
    this.posService.changeTicket(this.dataSource.data);
  }

  private getQuantity(): number {
    return this.multiplier > 0 ? this.multiplier : 1;
  }
}
