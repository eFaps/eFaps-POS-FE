import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
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
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

class AuthServiceStub {
  hasPermission(val: any) {
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
