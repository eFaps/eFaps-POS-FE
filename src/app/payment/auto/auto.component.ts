import { Component } from '@angular/core';
import { PaymentForm } from '../payment-form';
import { PaymentService, UtilsService, AutoPaymentService } from '../../services';
import { FormBuilder } from '@angular/forms';
import { PaymentType } from '../../model';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent extends PaymentForm {
  collecting = false;
  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder, private autoPaymentService: AutoPaymentService) {
    super(paymentService, utilsService, fb);
  }

  getPaymentType(): PaymentType {
    return PaymentType.AUTO;
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      this.collecting = true;
      this.autoPaymentService.collect(amount).subscribe(() => {
        super.addPayment();
        this.collecting = false;
      });
    }
  }
}
