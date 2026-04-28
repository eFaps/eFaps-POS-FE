import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, effect, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatStep, MatStepLabel, MatStepper, MatStepperModule } from "@angular/material/stepper";
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
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: "app-config-dialog",
  templateUrl: "./config-dialog.component.html",
  styleUrls: ["./config-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperModule,
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
    MatFormFieldModule,
    MatInputModule
  ],
})
export class ConfigDialogComponent implements OnInit {
  private matDialogRef =
    inject<MatDialogRef<ConfigDialogComponent>>(MatDialogRef);
  private productService = inject(ProductService);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private bomEntries: Map<String, BOMEntry[]> = new Map();

  product: Product;
  individualProducts: Product[] = [];
  remarkMode: boolean;
  formGroup: FormGroup<any>;
  indications: Indication[] = [];
  visible = true;
  removable = true;
  selectable = true;

  steps = signal<ConfigStep[]>([])
  loaded = signal<Boolean>(false)

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
    const steps: ConfigStep[] = []

    this.product.bomGroupConfigs.sort((a, b) => a.weight - b.weight).forEach((bomGroup) => {
      const formName = bomGroup.oid as string;
      const formGrp = fb.group({})

      const optional = this.isBomGroupOptional(bomGroup)

      formGrp.addControl(formName, new FormControl<any>("", optional ? [] : [Validators.required]));
      steps.push({
        type: "BOMGroup",
        formGroup: formGrp,
        label: bomGroup.description,
        ctrlName: formName,
        bomGroup: bomGroup
      })
    });
    this.steps.set(steps)
  }

  ngOnInit(): void {
    const calls: Observable<Product>[] = []
    this.product.configurationBOMs.forEach((element) => {
      calls.push(this.productService.getProduct(element.toProductOid))
    })

    forkJoin(calls).subscribe({
      next: allProducts => {
        let maxLength = 0;
        this.product.configurationBOMs.sort((a, b) => a.position - b.position).forEach((element) => {
          allProducts.filter(product => product.oid == element.toProductOid).forEach(product => {
            if (!this.bomEntries.has(element.bomGroupOid)) {
              this.bomEntries.set(element.bomGroupOid, []);
            }
            const toProducts = this.bomEntries.get(element.bomGroupOid);
            toProducts!.push({ oid: element.oid, product: product });

            if (toProducts!.length > 2) {
              let length = 0
              toProducts!.forEach(entry => {
                length = length + (entry.product.description ? entry.product.description!.length : entry.product.sku.length)
              })
              if (length > maxLength) {
                maxLength = length
              }
            }
          })
        })
        if (maxLength > 40) {
          const width = maxLength * 10 + "px"
          this.matDialogRef.updateSize(width, "")
        }
        this.loaded.set(true)
      }
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

  getBOMEntries4BOMGroup(oid: String): BOMEntry[] {
    return this.bomEntries.has(oid) ? <BOMEntry[]>this.bomEntries.get(oid) : [];
  }

  isBomGroupMultiple(bomGroupConfig: BOMGroupConfig) {
    return !hasFlag(bomGroupConfig, BOMGroupConfigFlag.onlyOne);
  }

  isBomGroupOptional(bomGroupConfig: BOMGroupConfig) {
    return hasFlag(bomGroupConfig, BOMGroupConfigFlag.optional);
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
    const childProducts: BOMEntry[] = [];
    this.steps().forEach(step => {
      if (step.type == "BOMGroup") {
        var value = step.formGroup.value[step.bomGroup!.oid]
        if (Array.isArray(value)) {
          value.forEach((val) => {
            childProducts.push(val);
          });
        } else if (value) {
          childProducts.push(value);
        }
      }
    });

    const remarks: string[] = [];

    this.indications.forEach((ind) => {
      remarks.push(ind.value);
    });


    this.matDialogRef.close({
      remark: remarks.join("\n"),
      bomEntries: childProducts,
      selectedIndividual: this.formGroup.value.selectedIndividual,
    });

  }

  cancel() {
    this.matDialogRef.close();
  }

  validate(): boolean {
    let valid = true
    this.steps().forEach(element => {
      valid = valid && element.formGroup.valid
    });
    return valid
  }
}

interface ConfigStep {
  type: "BOMGroup" | "OTHER"
  formGroup: FormGroup,
  label: string
  ctrlName: string
  bomGroup?: BOMGroupConfig
}

export interface BOMEntry {
  oid: string,
  product: Product
}
