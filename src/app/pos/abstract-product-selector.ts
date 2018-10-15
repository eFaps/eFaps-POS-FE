import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item, Product } from '../model/index';
import { PosService, ProductService } from '../services/index';

export abstract class AbstractProductSelector implements OnInit {
  ticket: Item[];
  @Input() multiplier: number;
  @Output() selection = new EventEmitter<number>();

  constructor(protected productService: ProductService,
    protected posService: PosService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(_ticket => this.ticket = _ticket);
  }

  select(_product: Product) {
    const quantity = this.multiplier > 0 ? this.multiplier : 1;
    this.ticket.push({
      product: _product,
      quantity: quantity,
      price: 0
    });
    this.syncTicket();
    this.selection.emit(0);
  }

  syncTicket() {
    this.posService.changeTicket(this.ticket);
  }
}
