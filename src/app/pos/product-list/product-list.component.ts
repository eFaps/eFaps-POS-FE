import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Product } from '../../model/index';
import { PosService, ProductService } from '../../services/index';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  formCtrlSub: Subscription;
  displayedColumns = ['sku', 'description'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private posService: PosService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      'filter': []
    });
    this.formCtrlSub = this.filterForm.valueChanges
      .debounceTime(500)
      .subscribe(newValue => this.applyFilter(newValue.filter));
  }

  applyFilter(_filterValue: string) {
    this.productService.findProducts(_filterValue)
      .subscribe((_products) => {
        this.dataSource.data = _products;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }
}