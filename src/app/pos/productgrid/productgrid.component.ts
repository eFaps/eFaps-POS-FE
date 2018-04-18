import { Component, OnInit } from '@angular/core';
import { Item, PosCategory, Product } from '../../model/index';
import { PosService, ProductService } from '../../services/index';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css']
})
export class ProductgridComponent implements OnInit {
  categories = [];
  ticket: Item[];
  constructor(private productService: ProductService, private ticketSync: PosService) { }

  ngOnInit() {
    this.productService.getPosCategories()
      .subscribe(_categories => this.categories = _categories);
    this.ticketSync.currentTicket.subscribe(_ticket => this.ticket = _ticket);
  }

  select(_product: Product) {
    this.ticket.push({
        product: _product,
        quantity: 1,
        price: 0 });
    this.syncTicket();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }
}
