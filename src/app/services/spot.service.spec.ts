import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { SpotService } from './spot.service';
import { WorkspaceService } from './workspace.service';

describe('SpotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        ConfigService,
        DocumentService,
        SpotService,
        WorkspaceService
      ]
    });
  });

  it('should be created', inject([SpotService], (service: SpotService) => {
    expect(service).toBeTruthy();
  }));
});
