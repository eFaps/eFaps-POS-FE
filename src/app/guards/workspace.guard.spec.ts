import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, ConfigService, WorkspaceService } from '../services/index';

import { WorkspaceGuard } from './workspace.guard';

describe('WorkspaceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthService,
        WorkspaceGuard,
        ConfigService,
        WorkspaceService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should ...', inject([WorkspaceGuard], (guard: WorkspaceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
