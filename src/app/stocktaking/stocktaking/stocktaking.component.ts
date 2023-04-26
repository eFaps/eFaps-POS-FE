import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Product, ProductService } from "@efaps/pos-library";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-stocktaking",
  templateUrl: "./stocktaking.component.html",
  styleUrls: ["./stocktaking.component.scss"],
})
export class StocktakingComponent implements OnInit {
  searchForm: FormGroup;
  searchControl: FormControl = new FormControl();
  searchResult: Product[] = [];
  textsearch = false;
  constructor(private productService: ProductService, fb: FormBuilder) {
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
              console.log(response);
              this.searchResult = response;
            });
        }
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
}
