import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute } from "@angular/router";
import {
  BalanceService,
  ConfigService,
  DocumentService,
  PaymentService,
  PosConfigToken,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";
import { DocumentComponent } from "../../shared/document/document.component";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { CreateCreditNoteComponent } from "./create-credit-note.component";

class DocumentServiceStub {}
class BalanceServiceStub {
  currentBalance = new Observable((observer) => {
    observer.next({ number: "test" });
  });
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      docTypes: [],
      printCmds: [],
      oid: "wsOid",
    });
  });
}
class PaymentServiceStub {}
class ActivatedRouteStub {
  queryParams = new Observable((observer) => {});
}
class ConfigServiceStub {
  getSystemConfig(key: string) {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("CreateCreditNoteComponent", () => {
  let component: CreateCreditNoteComponent;
  let fixture: ComponentFixture<CreateCreditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MatDialogModule, MatListModule, MatIconModule, CreateCreditNoteComponent],
    providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: MatDialogRef, useValue: {} },
        {
            provide: PosConfigToken,
            useValue: {
                order: "",
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
