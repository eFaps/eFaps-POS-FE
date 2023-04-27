import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import {
  BarcodeScannerService,
  Product,
  ProductService,
} from "@efaps/pos-library";
import { Subscription, debounceTime, skip } from "rxjs";

@Component({
  selector: "app-stocktaking",
  templateUrl: "./stocktaking.component.html",
  styleUrls: ["./stocktaking.component.scss"],
})
export class StocktakingComponent implements OnInit {
  searchForm: FormGroup;
  searchControl: FormControl = new FormControl();
  _searchResult: Product[] = [];
  textsearch = false;

  private subscriptions = new Subscription();

  quantity: number | undefined;

  constructor(
    private productService: ProductService,
    private barcodeScannerService: BarcodeScannerService,
    fb: FormBuilder
  ) {
    this.searchForm = fb.group({});
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((data) => {
        if (data != null && typeof data == "string") {
          this.productService
            .findProducts(data, this.textsearch)
            .subscribe((response) => {
              this.searchResult = response;
            });
        }
      });

    this.subscriptions.add(
      this.barcodeScannerService.barcode.pipe(skip(1)).subscribe({
        next: (barcode) => {
          if (barcode) {
            this.onBarcode(barcode);
          }
        },
      })
    );
  }

  displayFn(product?: Product): string {
    return product ? product.sku + " " + product.description : "";
  }

  clear() {
    this.searchControl.setValue(null);
  }

  selectProduct(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
  }

  onBarcode(barcode: string) {
    this.productService.getProductsByBarcode(barcode).subscribe((response) => {
      this.searchResult = response;
    });
  }

  get searchResult() {
    return this._searchResult;
  }

  set searchResult(products: Product[]) {
    this._searchResult = products;
    if (this._searchResult.length == 1) {
      this.searchControl.setValue(this._searchResult[0]);
    }
  }

  setQuantity(number: string) {
    if (typeof this.quantity == "number") {
      this.quantity = new Number("" + this.quantity + number).valueOf();
    } else {
      this.quantity = new Number(number).valueOf();
    }
  }

  get disabled() {
    return !(
      this.quantity &&
      this.quantity > 0 &&
      typeof this.searchControl.value?.oid == "string"
    );
  }

  save() {
    console.log(this.quantity + " - " + this.searchControl.value.oid);
    this.clear();
    this.quantity = undefined;
  }
}
