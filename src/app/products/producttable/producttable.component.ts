import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { LocalStorage } from 'ngx-store';

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
  @LocalStorage() virtKeyboard = false;
  filterForm: FormGroup;

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
    this.filterForm = this.fb.group({
      filter: ['']
    });
    this.filterForm.get('filter').valueChanges.subscribe(value => this.applyFilter(value));
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
