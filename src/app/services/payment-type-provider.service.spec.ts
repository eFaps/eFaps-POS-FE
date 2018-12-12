import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { PaymentTypeProviderService } from './payment-type-provider.service';

class TranslateServiceStub { }

describe('PaymentTypeProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: TranslateService, useClass: TranslateServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: PaymentTypeProviderService = TestBed.get(PaymentTypeProviderService);
    expect(service).toBeTruthy();
  });
});
