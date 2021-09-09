import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  BarcodeScannerService,
  MsgService,
  PosLayout,
  PosService,
  WorkspaceService,
  PosConfigToken,
  ProductService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { SharedModule } from "../shared/shared.module";
import { CommandsComponent } from "./commands/commands.component";
import { PosComponent } from "./pos.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

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
}
class MsgServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next();
  });
  init() {}
  publishStartEditOrder(_id) {}
  publishFinishEditOrder(_id) {}
}
class WorkspaceServiceStub {
  getPosLayout() {
    return PosLayout.GRID;
  }
}
class BarcodeScannerServiceStub {
  barcode = new Observable((observer) => {
    observer.next({});
  });
}

class ProductServiceStub {
  getProductsByType(type) {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
describe("PosComponent", () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: MsgService, useClass: MsgServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: BarcodeScannerService, useClass: BarcodeScannerServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: PosConfigToken, useValue: {} },
      ],
      declarations: [
        PosComponent,
        MockComponent(ProductGridComponent),
        MockComponent(ProductListComponent),
        MockComponent(TicketComponent),
        MockComponent(TotalsComponent),
        MockComponent(CommandsComponent),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
