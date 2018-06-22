import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';

import { Item, PosCategory, Product } from '../../model/index';
import { PosService, ProductService } from '../../services/index';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.scss']
})
export class ProductgridComponent implements OnInit {
  categories = [];
  ticket: Item[];
  shownTabs = [0];

  constructor(private productService: ProductService, private posService: PosService) { }

  ngOnInit() {
    this.productService.getPosCategories()
      .subscribe(_categories => this.categories = _categories);
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

  tabChanged(_tabChangeEvent: MatTabChangeEvent): void {
    if (!this.shownTabs.includes( _tabChangeEvent.index)) {
      this.shownTabs.push(_tabChangeEvent.index);
    }
  }
}
