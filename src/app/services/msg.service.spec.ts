import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { StompConfig, StompRService } from '@stomp/ng2-stompjs';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { MsgService } from './msg.service';

describe('MsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        ConfigService,
        MsgService,
        StompRService
      ]
    });
  });

  it('should be created', inject([MsgService], (service: MsgService) => {
    expect(service).toBeTruthy();
  }));
});
