import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/index'

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css']
})
export class ProductgridComponent implements OnInit {
  products = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  select(_product: Product) {
    console.log(_product.sku);
  }
}
