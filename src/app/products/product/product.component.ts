import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable, forkJoin } from 'rxjs';

import { InventoryEntry, Product, ProductRelation, RelationEntry } from '../../model/index';
import { InventoryService, PosService, ProductService, WorkspaceService } from '../../services/index';

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
  showInventory: boolean;
  inventory: InventoryEntry[] = [];
  relations: RelationEntry[] = [];

  constructor(private productService: ProductService,
    private posService: PosService,
    private workspaceService: WorkspaceService,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.showInventory = this.workspaceService.showInventory();
    this.loading = true;
    this.posService.currentCurrency.subscribe(_data => this.currentCurrency = _data);
    this.productService.getProduct(this.data.oid).subscribe(_product => {
      this.product = _product;
      this.getCategories(_product.categoryOids);
      this.loading = false;
      this.getRelations(_product.relations);
    });
    this.getInventory(this.data.oid);
  }

  getRelations(_productRelations: ProductRelation[]) {
    for (const relation of _productRelations) {
      this.productService.getProduct(relation.productOid).subscribe(_product => {
        this.relations.push({
          label: relation.label,
          product: _product
        });
      });
    }
  }

  getCategories(_categoryOids: string[]) {
    for (const oid of _categoryOids) {
      this.productService.getCategory(oid).subscribe(_category => {
        this.categories.push(_category.name);
      });
    }
  }

  getInventory(_productOid: string) {
    if (this.showInventory) {
      this.inventoryService.getInventory4Product(_productOid).subscribe(_entry => {
        _entry.forEach(inv => this.inventory.push(inv));
      });
    }
  }
}
