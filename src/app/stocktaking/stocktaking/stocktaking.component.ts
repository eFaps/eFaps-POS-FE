import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatSnackBar } from "@angular/material/snack-bar";
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
  standalone: false,
})
export class StocktakingComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private stocktakingService = inject(StocktakingService);
  private productService = inject(ProductService);
  private barcodeScannerService = inject(BarcodeScannerService);

  searchForm: FormGroup;
  commentForm: FormGroup;
  searchControl: FormControl = new FormControl();
  _searchResult: Product[] = [];
  textsearch = false;
  searchByBarcode = false;
  private subscriptions = new Subscription();

  quantity: number | undefined;

  stocktaking: Stocktaking | undefined;
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;

  private defaultComment = "";

  private preventKeyPad = true;

  constructor() {
    const router = this.router;
    const fb = inject(FormBuilder);

    const state = router.getCurrentNavigation()!!.extras.state;
    if (state != undefined) {
      this.defaultComment = state["comment"];
    }
    this.searchForm = fb.group({});
    this.commentForm = fb.group({
      comment: [this.defaultComment],
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((data) => {
        if (data != null && typeof data == "string") {
          if (this.searchByBarcode) {
            this.onBarcode(data);
          } else {
            this.productService
              .findProducts(data, this.textsearch)
              .subscribe((response) => {
                this.searchResult = response;
              });
          }
        }
      });

    this.subscriptions.add(
      this.barcodeScannerService.barcode.pipe(skip(1)).subscribe({
        next: (barcode) => {
          if (barcode) {
            this.onBarcode(barcode);
          }
        },
      }),
    );

    this.route.params
      .pipe(
        switchMap((params) => {
          return this.stocktakingService.getCurrent(params["oid"]);
        }),
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
    this.quantity = undefined;
    this.searchControl.setValue(null);
    this.commentForm.controls["comment"].setValue(this.defaultComment);
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
    if (!this.preventKeyPad) {
      if (typeof this.quantity == "number") {
        this.quantity = new Number("" + this.quantity + number).valueOf();
      } else {
        this.quantity = new Number(number).valueOf();
      }
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
        comment: this.commentForm.controls["comment"].value,
      })
      .subscribe({
        next: (id) => {
          console.log(id);
          this.snackBar.open("Archivado", undefined, { duration: 1500 });
        },
        error: (e) => {
          console.log(e);
        },
      });
    this.clear();
    this.quantity = undefined;
  }

  onFocusEvent(event: Event) {
    this.preventKeyPad = true;
  }

  onBlurEvent(event: Event) {
    this.preventKeyPad = false;
  }

  toggleSearchByBarcode() {
    this.searchByBarcode = !this.searchByBarcode;
  }
}
