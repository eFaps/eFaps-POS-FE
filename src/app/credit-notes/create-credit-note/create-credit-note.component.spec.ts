import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute } from "@angular/router";
import {
  BalanceService,
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
import { CreateCreditNoteComponent } from "./create-credit-note.component";

class DocumentServiceStub {}
class BalanceServiceStub {
  currentBalance = new Observable((observer) => {});
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

describe("CreateCreditNoteComponent", () => {
  let component: CreateCreditNoteComponent;
  let fixture: ComponentFixture<CreateCreditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCreditNoteComponent,
        MockComponent(DocumentComponent),
      ],
      imports: [MatDialogModule, MatListModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
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
