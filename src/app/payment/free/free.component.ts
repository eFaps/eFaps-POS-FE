import { Component, OnInit } from '@angular/core';
import { CashComponent } from '../cash/cash.component';
import { Payment, PaymentType } from '../../model/index';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss']
})
export class FreeComponent extends CashComponent {

    addPayment() {
      const amount = this.utilsService.parse(this.paymentForm.value.amount);
      if (amount > 0) {
        this.payments.push({
          type: PaymentType.FREE,
          amount: amount
        });
        this.paymentService.updatePayments(this.payments);
        this.paymentForm.setValue({ 'amount': 0 });
        this.setNumber('0');
      }
    }

}
