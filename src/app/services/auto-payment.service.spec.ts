import { TestBed } from '@angular/core/testing';

import { AutoPaymentService } from './auto-payment.service';

describe('AutoPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoPaymentService = TestBed.get(AutoPaymentService);
    expect(service).toBeTruthy();
  });
});
