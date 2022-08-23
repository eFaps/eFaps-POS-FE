import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
  BalanceService,
  DocumentService,
  PaymentService,
  PosConfigToken,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockDirective, MockInstance } from "ng-mocks";
import { Observable } from "rxjs";

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatListModule],
      declarations: [CreateCreditNoteComponent],
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
