import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, ProductService } from '@efaps/pos-library';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {
  private products: Map<String,Product[]> = new Map();
  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
    this.data.configurationBOMs.forEach(element => {
      this.productService.getProduct(element.toProductOid).subscribe({
        next: product =>{
          if (!this.products.has(element.bomGroupOid)) {
            this.products.set(element.bomGroupOid, [])
          }
          const toProducts = this.products.get(element.bomGroupOid)
          toProducts?.push(product)
        } 
      })
    });
  }

  getProducts4BOMGroup(oid: String): Product[] {
    return this.products.has(oid) ? <Product[]> this.products.get(oid) : []
  }
}
