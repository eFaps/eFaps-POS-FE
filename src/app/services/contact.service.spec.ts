import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { ConfigService } from '@efaps/pos-library';

class ConfigServiceStub {}

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        ContactService,
        { provide: ConfigService, useClass: ConfigServiceStub }
      ]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
