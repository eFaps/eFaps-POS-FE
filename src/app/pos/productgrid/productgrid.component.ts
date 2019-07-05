import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

import { PosService, ProductService } from '../../services/index';
import { AbstractProductSelector } from '../abstract-product-selector';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.scss']
})
export class ProductgridComponent extends AbstractProductSelector implements OnInit {
  categories = [];
  shownTabs = [0];
  selectedIndex;

  //size = 'small';
  //size = 'medium';
  size = 'big';

  constructor(protected productService: ProductService, protected posService: PosService) {
    super(productService, posService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.productService.getPosCategories()
      .subscribe(_categories => this.categories = _categories);
  }

  tabChanged(_tabChangeEvent: MatTabChangeEvent): void {
    if (!this.shownTabs.includes(_tabChangeEvent.index)) {
      this.shownTabs.push(_tabChangeEvent.index);
    }
  }
}
