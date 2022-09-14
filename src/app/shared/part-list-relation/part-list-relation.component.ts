import { Component, OnInit, Input } from "@angular/core";
import { ProductService, Product, ProductRelation } from "@efaps/pos-library";

@Component({
  selector: "app-part-list-relation",
  templateUrl: "./part-list-relation.component.html",
  styleUrls: ["./part-list-relation.component.scss"],
})
export class PartListRelationComponent implements OnInit {
  _productRelation!: ProductRelation;
  product: Product | undefined;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  @Input()
  set productRelation(productRelation: ProductRelation) {
    this._productRelation = productRelation;
    this.evalRelation(this._productRelation);
  }

  get productRelation() {
    return this._productRelation;
  }

  private evalRelation(productRelation: ProductRelation) {
    this.productService
      .getProduct(productRelation.productOid)
      .subscribe((product) => {
        this.product = product;
      });
  }
}
