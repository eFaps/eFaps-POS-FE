import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { PrintService } from './print.service';

describe('PrintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService,
        PrintService
      ]
    });
  });

  it('should be created', inject([PrintService], (service: PrintService) => {
    expect(service).toBeTruthy();
  }));
});
