import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatLegacyAutocomplete as MatAutocomplete, MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from "@angular/material/legacy-autocomplete";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BarcodeScannerService,
  Product,
  ProductService,
  Stocktaking,
  StocktakingService,
} from "@efaps/pos-library";
import { Subscription, debounceTime, skip, switchMap } from "rxjs";

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

  stocktaking: Stocktaking | undefined;
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private stocktakingService: StocktakingService,
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

    this.route.params
      .pipe(
        switchMap((params) => {
          return this.stocktakingService.getCurrent(params["oid"]);
        })
      )
      .subscribe({
        next: (stocktaking) => {
          if (stocktaking) {
            this.stocktaking = stocktaking;
          }
        },
        error: (err: any) => {
          if (err.status == 404) {
            this.router.navigate(["stocktaking", "init"]);
          }
        },
      });
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
    this.stocktakingService
      .addEntry(this.stocktaking!.id, {
        productOid: this.searchControl.value.oid,
        quantity: this.quantity!,
      })
      .subscribe({
        next: (id) => {
          console.log(id);
          this.snackBar.open("Archivado");
        },
        error: (e) => {
          console.log(e);
        },
      });
    this.clear();
    this.quantity = undefined;
  }
}
