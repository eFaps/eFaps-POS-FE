import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  Indication,
  Product,
  ProductIndividual,
  ProductRelationType,
  ProductService,
  ProductType,
} from "@efaps/pos-library";

@Component({
  selector: "app-config-dialog",
  templateUrl: "./config-dialog.component.html",
  styleUrls: ["./config-dialog.component.scss"],
  standalone: false,
})
export class ConfigDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private products: Map<String, Product[]> = new Map();

  product: Product;
  individualProducts: Product[] = [];
  remarkMode: boolean;
  formGroup: FormGroup<any>;
  indications: Indication[] = [];
  visible = true;
  removable = true;
  selectable = true;

  constructor(
    private matDialogRef: MatDialogRef<ConfigDialogComponent>,
    private productService: ProductService,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.product = data.product;
    this.remarkMode = data.remarkMode;
    this.formGroup = fb.group({});
    if (this.isSelectIndividual()) {
      this.formGroup.addControl(
        "selectedIndividual",
        new FormControl<Product | undefined>(undefined, [Validators.required]),
      );
    }
    this.product.bomGroupConfigs.forEach((element) => {
      const formName = element.oid as string;
      this.formGroup.addControl(formName, new FormControl<any>(""));
    });
  }

  ngOnInit(): void {
    this.product.configurationBOMs.forEach((element) => {
      this.productService.getProduct(element.toProductOid).subscribe({
        next: (product) => {
          if (!this.products.has(element.bomGroupOid)) {
            this.products.set(element.bomGroupOid, []);
          }
          const toProducts = this.products.get(element.bomGroupOid);
          toProducts?.push(product);
        },
      });
    });
    if (this.isSelectIndividual()) {
      this.product.relations
        .filter((relation) => {
          return (
            relation.type == ProductRelationType.BATCH ||
            relation.type == ProductRelationType.INDIVIDUAL
          );
        })
        .forEach((relation) => {
          this.productService
            .getProduct(relation.productOid)
            .subscribe({ next: (prod) => this.individualProducts.push(prod) });
        });
    }
  }

  isSelectIndividual(): boolean {
    return (
      ProductType.STANDART == this.product.type &&
      (this.product.individual == ProductIndividual.BATCH ||
        this.product.individual == ProductIndividual.INDIVIDUAL)
    );
  }

  getProducts4BOMGroup(oid: String): Product[] {
    return this.products.has(oid) ? <Product[]>this.products.get(oid) : [];
  }

  remove(indication: any): void {
    const index = this.indications.indexOf(indication);

    if (index >= 0) {
      this.indications.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.addIndication(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  select(indication: Indication) {
    this.addIndication(indication.value);
  }

  private addIndication(value: string) {
    if (!this.indications.some((val) => val.value === value)) {
      this.indications.push({ oid: "", value: value });
    }
  }

  close() {
    if (this.formGroup.valid) {
      const remarks: string[] = [];
      const childProducts: Product[] = [];

      this.indications.forEach((ind) => {
        remarks.push(ind.value);
      });
      this.product.bomGroupConfigs.forEach((element) => {
        var value = this.formGroup.value[element.oid as string];
        if (Array.isArray(value)) {
          value.forEach((val) => {
            childProducts.push(val);
          });
        } else if (value) {
          childProducts.push(value);
        }
      });

      this.matDialogRef.close({
        remark: remarks.join("\n"),
        childProducts: childProducts,
        selectedIndividual: this.formGroup.value.selectedIndividual,
      });
    }
  }
}
