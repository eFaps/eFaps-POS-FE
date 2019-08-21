import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Payment, PaymentType, Collector } from '../../model';
import { CollectService, PaymentService, UtilsService } from '../../services';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent extends PaymentForm {
  collecting = false;
  collectors: Collector[];

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder, private collectService: CollectService) {
    super(paymentService, utilsService, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscription$.add(this.collectService.getCollectors().subscribe({
      next: collectors => this.collectors = collectors
    }))
  }

  getPayment(): Payment {
    return { type: PaymentType.AUTO, amount: 0 };
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      this.collecting = true;
      this.collectService.collect(this.collectors[0].key, amount).subscribe(() => {
        super.addPayment();
        this.collecting = false;
      });
    }
  }
}
