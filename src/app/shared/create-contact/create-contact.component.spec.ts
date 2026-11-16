import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  ConfigService,
  ContactService,
  PosConfigToken,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/internal/Observable";
import { beforeEach, describe, expect, it } from "vitest";

import { CreateContactComponent } from "./create-contact.component";

class TranslateServiceStub {
  get() {
    return new Observable((observer) => {
      observer.next("");
    });
  }
}

class ConfigServiceStub {
  getSystemConfig() {
    return new Observable((observer) => {
      observer.next("");
    });
  }
}

describe("CreateContactComponent", () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContactComponent, MockPipe(TranslatePipe)],
      providers: [
        provideZonelessChangeDetection(),
        ConfigService,
        WorkspaceService,
        { provide: PosConfigToken, useValue: {} },
        { provide: ContactService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
