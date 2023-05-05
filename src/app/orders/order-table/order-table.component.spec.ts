import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  ConfigService,
  ContactService,
  DocumentService,
  Order,
  PaymentService,
  PosCurrencyPipe,
  PosLayout,
  PosService,
  SpotConfig,
  PosGridSize,
  UtilsService,
  Workspace,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { OrderTableComponent } from "./order-table.component";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";

class AuthServiceStub {
  hasRole(val: any) {
    return false;
  }
}
class ConfigServiceStub {}
class DocumentServiceStub {
  getOpenOrders(): Observable<Order[]> {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
  findOrders(_term: string): Observable<Order[]> {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
class PosServiceStub {}
class UtilsServiceStub {}
class WorkspaceServiceStub {
  showSpots() {
    return false;
  }
  allowPayment() {
    return true;
  }
  currentWorkspace: Observable<Workspace> = new Observable((observer) => {
    observer.next({
      oid: "string",
      name: "string",
      posOid: "string",
      docTypes: [],
      spotConfig: SpotConfig.NONE,
      spotCount: 0,
      warehouseOid: "string",
      printCmds: [],
      posLayout: PosLayout.BOTH,
      discounts: [],
      cards: [],
      gridSize: PosGridSize.SMALL,
      floors: [],
      flags: 0,
    });
  });
}
class PaymentServiceStub {}
class ContactServiceStub {}

describe("OrderTableComponent", () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        OrderTableComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(TranslatePipe),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
