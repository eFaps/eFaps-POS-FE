import { Component, OnInit, Input } from "@angular/core";
import { ProductService, Product } from "@efaps/pos-library";

@Component({
  selector: "app-part-list-relation",
  templateUrl: "./part-list-relation.component.html",
  styleUrls: ["./part-list-relation.component.scss"]
})
export class PartListRelationComponent implements OnInit {
  _productOid: string;
  product: Product;
  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

  @Input()
  set productOid(oid: string) {
    this._productOid = oid;
    this.evalRelation(this._productOid);
  }

  get productOid() {
    return this._productOid;
  }

  private evalRelation(productOid: string) {
    this.productService.getProduct(productOid).subscribe(product => {
      console.log("xxx")
      this.product = product;
    });
  }
}
