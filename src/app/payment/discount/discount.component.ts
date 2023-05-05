import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import {
  Discount,
  DiscountService,
  DiscountType,
  Order,
  PaymentService,
  UtilsService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.scss"],
})
export class DiscountComponent implements OnInit, OnDestroy {
  private document!: Order;
  private subscriptions$ = new Subscription();
  amountForm: FormGroup;
  percentForm: FormGroup;
  _discounts: Discount[] = [];
  currency!: string;

  constructor(
    public dialogRef: MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
    private discountService: DiscountService,
    private utilsService: UtilsService,
    private fb: UntypedFormBuilder
  ) {
    this.amountForm = this.fb.group({
      amount: ["0.00", [Validators.min(0), Validators.required]],
    });
    this.percentForm = this.fb.group({
      percent: ["0", [Validators.min(0), Validators.required]],
    });
  }

  ngOnInit() {
    this.subscriptions$.add(
      this.workspaceService.currentWorkspace.subscribe((ws) => {
        this._discounts = ws.discounts;
      })
    );
    this.document = this.data;
    this.currency = this.utilsService.getCurrencySymbol(
      this.paymentService.currency
    );
  }

  get percentDiscounts() {
    return this._discounts
      .filter(
        (discount) =>
          discount.type == DiscountType.PERCENT &&
          discount.value &&
          discount.value > 0
      )
      .sort((d1, d2) => d1.value - d2.value);
  }

  get amountDiscounts() {
    return this._discounts
      .filter(
        (discount) =>
          discount.type == DiscountType.AMOUNT &&
          discount.value &&
          discount.value > 0
      )
      .sort((d1, d2) => d1.value - d2.value);
  }

  get manualPercent(): boolean {
    return this._discounts.some(
      (discount) =>
        discount.type == DiscountType.PERCENT &&
        (!discount.value || discount.value <= 0)
    );
  }

  get manualAmount(): boolean {
    return this._discounts.some(
      (discount) =>
        discount.type == DiscountType.AMOUNT &&
        (!discount.value || discount.value <= 0)
    );
  }

  applyPercentAmount() {
    if (this.percentForm.valid) {
      const percent = Number(this.percentForm.get("percent")!.value);
      const discount = this._discounts.find(
        (discount) =>
          discount.type == DiscountType.PERCENT &&
          (!discount.value || discount.value <= 0)
      );
      this.applyDiscount({ ...discount!, value: percent });
    }
  }

  applyManualAmount() {
    if (this.amountForm.valid) {
      const amount = Number(this.amountForm.get("amount")!.value);
      const discount = this._discounts.find(
        (discount) =>
          discount.type == DiscountType.AMOUNT &&
          (!discount.value || discount.value <= 0)
      );
      this.applyDiscount({ ...discount!, value: amount });
    }
  }

  applyDiscount(discount: Discount | null) {
    const docWithDiscount = this.discountService.applyDiscount(
      this.document,
      discount
    );
    this.paymentService.updateDocument(docWithDiscount);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
