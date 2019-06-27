import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { WorkspaceService, PaymentService, DiscountService } from '../../services';
import { Discount, DiscountType, Order } from '../../model';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {
  private document: Order;
  private subscriptions$ = new Subscription();
  _discounts: Discount[] = [];

  constructor(public dialogRef: MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private workspaceService: WorkspaceService,
    public paymentService: PaymentService, private discountService: DiscountService) { }

  ngOnInit() {
    this.subscriptions$.add(this.workspaceService.currentWorkspace.subscribe(ws => {
      this._discounts = ws.discounts
    }));
    this.document = this.data;
  }

  get percentDiscount() {
    return this._discounts
      .filter(discount => discount.type == DiscountType.PERCENT)
      .sort((d1, d2) => d1.value - d2.value);
  }

  get amountDiscount() {
    return this._discounts
      .filter(discount => discount.type == DiscountType.AMOUNT)
      .sort((d1, d2) => d1.value - d2.value);
  }

  applyDiscount(discount: Discount) {
    const docWithDiscount = this.discountService.applyDiscount(this.document, discount);
    this.paymentService.updateDocument(docWithDiscount);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
