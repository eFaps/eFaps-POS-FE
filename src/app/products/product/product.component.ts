import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Product } from '../../model/index';
import { PosService, ProductService } from '../../services/index';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product;
  currentCurrency: string;
  categories: string[] = [];
  loading: boolean;

  constructor(private productService: ProductService,
    private posService: PosService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.loading = true;
    this.posService.currentCurrency.subscribe(_data => this.currentCurrency = _data);
    this.productService.getProduct(this.data.oid).subscribe(_product => {
      this.product = _product;
      this.getCategories(_product.categoryOids);
      this.loading = false;
    });
  }

  getCategories(_categoryOids: string[]) {
    for (const oid of _categoryOids) {
      this.productService.getCategory(oid).subscribe(_category => {
        this.categories.push(_category.name);
      });
    }
  }
}
