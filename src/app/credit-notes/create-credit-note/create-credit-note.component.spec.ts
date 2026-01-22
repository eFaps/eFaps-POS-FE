import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute, provideRouter } from "@angular/router";
import {
  BalanceService,
  ConfigService,
  CreditNote,
  Currency,
  DocStatus,
  DocumentService,
  PaymentService,
  PosConfigToken,
  Receipt,
  WorkspaceService,
} from "@efaps/pos-library";
import { provideTranslateService, TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { CreateCreditNoteComponent } from "./create-credit-note.component";
class DocumentServiceStub {
  getReceipt(id: string): Observable<Receipt> {
    return new Observable((observer) => {
      observer.next({
        id: "6546816",
        balanceOid: "0815",
        payments: [],
        oid: null,
        number: null,
        currency: Currency.PEN,
        items: [],
        status: DocStatus.OPEN,
        netTotal: 0,
        crossTotal: 0,
        exchangeRate: 0,
        payableAmount: 0,
        taxes: [],
        discount: null,
      });
    });
  }
  getCreditNotes4SourceDocument(id: string): Observable<CreditNote[]> {
    return new Observable();
  }

  validateForCreditNote(): Observable<any> {
    return new Observable();
  }
}
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
  queryParams = new Observable((observer) => {
    observer.next({
      sourceType: "RECEIPT",
    });
  });
}
class ConfigServiceStub {
  getSystemConfig(key: string) {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

class TestComponent {}

describe("CreateCreditNoteComponent", () => {
  let component: CreateCreditNoteComponent;
  let fixture: ComponentFixture<CreateCreditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockPipe(TranslatePipe),
        MatDialogModule,
        MatListModule,
        MatIconModule,
        CreateCreditNoteComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: "pos", component: TestComponent }]),
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: DocumentService, useClass: DocumentServiceStub },

        provideTranslateService({
          defaultLanguage: "en",
        }),
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
