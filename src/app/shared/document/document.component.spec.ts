import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import {
  AuthService,
  DocumentService,
  EmployeeService,
  PosConfigToken,
  PrintService,
  PromotionService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DocumentComponent } from "./document.component";

const routerSpy = {
  navigate: vi.fn().mockName("Router.navigate"),
};

class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      printCmds: [],
    });
  });
}
class PrintServiceStub {}
class PromotionServiceStub {
  getPromotionInfoForDocument(type: any) {
    return new Observable((observer) => {
      observer.next({});
    });
  }
}

describe("DocumentComponent", () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule,
        MatTableModule,
        DocumentComponent,
        MockPipe(TranslatePipe),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosConfigToken, useValue: {} },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: {} },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PrintService, useClass: PrintServiceStub },
        { provide: DocumentService, useValue: {} },
        { provide: EmployeeService, useValue: {} },
        { provide: PromotionService, useClass: PromotionServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
