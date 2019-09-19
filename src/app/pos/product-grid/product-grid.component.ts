import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { PosService, ProductService, WorkspaceService } from '../../services/index';
import { AbstractProductSelector } from '../abstract-product-selector';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent extends AbstractProductSelector
  implements OnInit, OnDestroy {
  categories = [];
  shownTabs = [0];
  selectedIndex;
  currentCurrency: string;

  //size = 'small';
  //size = 'medium' | big;
  size = 'large';
  showPrices = true;
  private subscription$ = new Subscription();

  constructor(productService: ProductService, posService: PosService,
    dialog: MatDialog, private workspaceService: WorkspaceService) {
    super(productService, posService, dialog);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscription$.add(this.productService.getPosCategories()
      .subscribe({
        next: _categories => this.categories = _categories
      })
    );

    this.workspaceService.currentWorkspace.subscribe({
      next: workspace => {
        if (workspace) {
          this.showPrices = workspace.gridShowPrice;
          this.size = workspace.gridSize ? workspace.gridSize.toLowerCase() : 'large';
          if (this.showPrices) {
            this.subscription$.add(this.posService.currentCurrency.subscribe({
              next: currency => this.currentCurrency = currency
            }));
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  tabChanged(_tabChangeEvent: MatTabChangeEvent): void {
    if (!this.shownTabs.includes(_tabChangeEvent.index)) {
      this.shownTabs.push(_tabChangeEvent.index);
    }
  }
}
