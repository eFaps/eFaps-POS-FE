import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Discount, DiscountService, DiscountType, Order, PaymentService, UtilsService, WorkspaceService, PosLibraryModule } from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
    selector: "app-discount",
    templateUrl: "./discount.component.html",
    styleUrls: ["./discount.component.scss"],
    imports: [
        MatButton,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatPrefix,
        PosLibraryModule,
    ],
})
export class DiscountComponent implements OnInit, OnDestroy {
  dialogRef = inject<MatDialogRef<DiscountComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  private workspaceService = inject(WorkspaceService);
  paymentService = inject(PaymentService);
  private discountService = inject(DiscountService);
  private utilsService = inject(UtilsService);
  private fb = inject(UntypedFormBuilder);

  private document!: Order;
  private subscriptions$ = new Subscription();
  amountForm: FormGroup;
  percentForm: FormGroup;
  _discounts: Discount[] = [];
  currency!: string;

  constructor() {
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
      }),
    );
    this.document = this.data;
    this.currency = this.utilsService.getCurrencySymbol(
      this.paymentService.currency,
    );
  }

  get percentDiscounts() {
    return this._discounts
      .filter(
        (discount) =>
          discount.type == DiscountType.PERCENT &&
          discount.value &&
          discount.value > 0,
      )
      .sort((d1, d2) => d1.value - d2.value);
  }

  get amountDiscounts() {
    return this._discounts
      .filter(
        (discount) =>
          discount.type == DiscountType.AMOUNT &&
          discount.value &&
          discount.value > 0,
      )
      .sort((d1, d2) => d1.value - d2.value);
  }

  get manualPercent(): boolean {
    return this._discounts.some(
      (discount) =>
        discount.type == DiscountType.PERCENT &&
        (!discount.value || discount.value <= 0),
    );
  }

  get manualAmount(): boolean {
    return this._discounts.some(
      (discount) =>
        discount.type == DiscountType.AMOUNT &&
        (!discount.value || discount.value <= 0),
    );
  }

  applyPercentAmount() {
    if (this.percentForm.valid) {
      const percent = Number(this.percentForm.get("percent")!.value);
      const discount = this._discounts.find(
        (discount) =>
          discount.type == DiscountType.PERCENT &&
          (!discount.value || discount.value <= 0),
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
          (!discount.value || discount.value <= 0),
      );
      this.applyDiscount({ ...discount!, value: amount });
    }
  }

  applyDiscount(discount: Discount | null) {
    const docWithDiscount = this.discountService.applyDiscount(
      this.document,
      discount,
    );
    this.paymentService.updateDocument(docWithDiscount);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
