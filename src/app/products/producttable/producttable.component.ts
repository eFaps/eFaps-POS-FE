import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { Product } from '../../model/index';
import { ProductService } from '../../services/index';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.scss']
})
export class ProducttableComponent implements OnInit {
  displayedColumns = ['sku', 'description', 'cmd'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(_filterValue: string) {
    _filterValue = _filterValue.trim();
    _filterValue = _filterValue.toLowerCase();
    this.dataSource.filter = _filterValue;
  }

  show(_product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: _product,
    });
  }
}
