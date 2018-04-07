import { Component, OnInit } from '@angular/core';
import { Product, ProductService, PosService, Item } from '../../services/index'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css']
})
export class ProductgridComponent implements OnInit {
  products = [];
  ticket: Item[];
  constructor(private productService: ProductService, private ticketSync: PosService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
  }

  select(_product: Product) {
    this.ticket.push({
        productOid: _product.oid,
        productDesc: _product.description,
        quantity: 1,
        unitPrice: 0,
        price: 0 });
    this.syncTicket();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }
}
