import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from "@angular/material/button-toggle";
import {
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRemove,
  MatChipRow,
} from "@angular/material/chips";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatStep, MatStepLabel, MatStepper } from "@angular/material/stepper";
import {
  BOMGroupConfig,
  BOMGroupConfigFlag,
  hasFlag,
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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatRadioGroup,
    MatRadioButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatChipInput,
    MatDialogActions,
  ],
})
export class ConfigDialogComponent implements OnInit {
  private matDialogRef =
    inject<MatDialogRef<ConfigDialogComponent>>(MatDialogRef);
  private productService = inject(ProductService);

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

  constructor() {
    const fb = inject(FormBuilder);
    const data = inject(MAT_DIALOG_DATA);

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

  isBomGroupMultiple(bomGroupConfig: BOMGroupConfig) {
    return !hasFlag(bomGroupConfig, BOMGroupConfigFlag.onlyOne)
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

  submit() {
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

  cancel() {
    this.matDialogRef.close()
  }
}
