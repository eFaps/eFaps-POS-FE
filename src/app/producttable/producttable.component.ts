import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
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
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.getProducts()
        .subscribe(data => {
            this.dataSource.data = data;
            this.dataSource.sort = this.sort;
        });
  }
}
