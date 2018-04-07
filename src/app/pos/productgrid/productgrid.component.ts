import { Component, OnInit } from '@angular/core';
import { ProductService, PosService } from '../../services/index';
import { Product, Item, PosCategory } from '../../model/index';
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
      .subscribe(data => this.categories = data);
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
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
