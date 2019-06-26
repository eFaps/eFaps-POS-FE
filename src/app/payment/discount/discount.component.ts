import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { WorkspaceService, PaymentService } from '../../services';
import { Discount, DiscountType } from '../../model';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {

  private subscriptions$ = new Subscription();
  _discounts: Discount[] = [];

  constructor(public dialogRef: MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private workspaceService: WorkspaceService,
    public paymentService: PaymentService) { }

  ngOnInit() {
    this.subscriptions$.add(this.workspaceService.currentWorkspace.subscribe(ws => {
      this._discounts = ws.discounts
    }));
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
    console.log(discount)
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
