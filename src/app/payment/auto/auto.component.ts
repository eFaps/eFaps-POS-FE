import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Payment, PaymentType } from '../../model';
import { CollectService, PaymentService, UtilsService } from '../../services';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent extends PaymentForm {
  collecting = false;
  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder, private collectService: CollectService) {
    super(paymentService, utilsService, fb);
  }

  getPayment(): Payment {
    return { type: PaymentType.AUTO, amount: 0 };
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      this.collecting = true;
      this.collectService.collect(amount).subscribe(() => {
        super.addPayment();
        this.collecting = false;
      });
    }
  }
}
