import { OnInit } from '@angular/core';

import { Item, Product } from '../model/index';
import { PosService, ProductService } from '../services/index';

export abstract class AbstractProductSelector implements OnInit {
  ticket: Item[];

  constructor(protected productService: ProductService,
    protected posService: PosService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(_ticket => this.ticket = _ticket);
  }

  select(_product: Product) {
    this.ticket.push({
      product: _product,
      quantity: 1,
      price: 0
    });
    this.syncTicket();
  }

  syncTicket() {
    this.posService.changeTicket(this.ticket);
  }
}
