import { TestBed } from '@angular/core/testing';

import { PaymentTypeProviderService } from './payment-type-provider.service';

describe('PaymentTypeProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentTypeProviderService = TestBed.get(PaymentTypeProviderService);
    expect(service).toBeTruthy();
  });
});
