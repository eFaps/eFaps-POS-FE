import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { SpotService } from './spot.service';
import { WorkspaceService } from './workspace.service';
import { PosService } from './pos.service';

describe('PosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        ConfigService,
        DocumentService,
        PosService,
        WorkspaceService
      ]
    });
  });

  it('should be created', inject([PosService], (service: PosService) => {
    expect(service).toBeTruthy();
  }));
});
