import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from '../services/index';
import { Product } from '../model/index';

@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.css']
})
export class ProducttableComponent implements OnInit {
  displayedColumns = ['sku', 'description'];
  dataSource = new MatTableDataSource();

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.getProducts()
        .subscribe(data => this.dataSource.data = data);
  }
}
