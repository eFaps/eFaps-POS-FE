import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from './config.service';
import { ImageService } from './image.service';

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DomSanitizer,
        HttpClient,
        HttpHandler,
        ConfigService,
        ImageService
      ]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
