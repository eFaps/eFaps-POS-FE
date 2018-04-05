import { Component, OnInit } from '@angular/core';
import { Product, ProductService, PosService, Item } from '../../services/index'

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
    this.ticket.push({ productOid: _product.oid });
    this.syncTicket();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
    }
}
