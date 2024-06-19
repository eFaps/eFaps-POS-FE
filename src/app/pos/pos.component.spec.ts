import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  BarcodeScannerService,
  ContactService,
  EmployeeService,
  MsgService,
  PartListService,
  PosConfigToken,
  PosGridSize,
  PosLayout,
  PosService,
  ProductService,
  SpotConfig,
  UserService,
  Workspace,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { KeypadService, PosSyncService } from "../services";
import { SharedModule } from "../shared/shared.module";
import { CommandsComponent } from "./commands/commands.component";
import { PosComponent } from "./pos.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";

class AuthServiceStub {
  getCurrentUsername() {
    return "blabla";
  }
  currentEvent = new Observable((observer) => {
    observer.next({});
  });
}
class PosServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next({});
  });
  currentTicket = new Observable((observer) => {
    observer.next({});
  });
  setMultiplier(multiplier: number): void {}
}
class MsgServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next();
  });
  init() {}
  publishStartEditOrder(_id: any) {}
  publishFinishEditOrder(_id: any) {}
}
class WorkspaceServiceStub {
  getPosLayout() {
    return PosLayout.GRID;
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
class BarcodeScannerServiceStub {
  barcode = new Observable((observer) => {
    observer.next({});
  });
}

class ProductServiceStub {
  getProductsByType(type: any) {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
class PartListServiceStub {
  detectedPartList = new Observable((observer) => {
    observer.next();
  });
}
class PosSyncServiceStub {
  afterProductSelected = new Observable((observer) => {
    observer.next();
  });
}

class ContactServiceStub {}

describe("PosComponent", () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PosComponent,
        MockComponent(ProductGridComponent),
        MockComponent(ProductListComponent),
        MockComponent(TicketComponent),
        MockComponent(TotalsComponent),
        MockComponent(CommandsComponent),
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: MsgService, useClass: MsgServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: BarcodeScannerService, useClass: BarcodeScannerServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: PartListService, useClass: PartListServiceStub },
        { provide: PosSyncService, useClass: PosSyncServiceStub },
        { provide: EmployeeService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: KeypadService, useValue: {} },

        { provide: PosConfigToken, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBar },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
