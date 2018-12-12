import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { AutoComponent } from '../payment/auto/auto.component';
import { CardComponent } from '../payment/card/card.component';
import { CashComponent } from '../payment/cash/cash.component';
import { FreeComponent } from '../payment/free/free.component';
import { PaymentTypeItem } from '../payment/payment-type-item';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeProviderService {

  constructor(private translateService: TranslateService) { }

  getPaymentTypeItems(): Observable<PaymentTypeItem[]> {
    const items = [];
    items.push(new PaymentTypeItem(CashComponent, this.translateService.instant('PAYMENT.CASH')));
    items.push(new PaymentTypeItem(FreeComponent, this.translateService.instant('PAYMENT.FREE')));
    items.push(new PaymentTypeItem(CardComponent, this.translateService.instant('PAYMENT.CARD')));
    if (environment.electron) {
      items.push(new PaymentTypeItem(AutoComponent, this.translateService.instant('PAYMENT.AUTO')));
    }
    return of(items);
  }
}
