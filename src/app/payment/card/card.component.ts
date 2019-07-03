import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PaymentType } from '../../model/index';
import { PaymentService, UtilsService, WorkspaceService } from '../../services/index';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends PaymentForm {
  cards = [];

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder, private workspaceService: WorkspaceService) {
    super(paymentService, utilsService, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm = this.fb.group({
      'amount': ['0.00', Validators.min(0)],
      'card': []
    });
    this.workspaceService.currentWorkspace
      .subscribe(workspace => {
        this.cards = workspace.cards;
        this.paymentForm.patchValue({ card: this.cards[0] });
      });
  }

  getPaymentType(): PaymentType {
    return PaymentType.CARD;
  }
}
