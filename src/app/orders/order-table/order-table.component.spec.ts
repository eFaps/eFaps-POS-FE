import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  ConfigService,
  DocumentService,
  Order,
  PaymentService,
  PosCurrencyPipe,
  PosService,
  UtilsService,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { MaterialModule } from "../../material/material.module";
import { OrderTableComponent } from "./order-table.component";

class AuthServiceStub {
  hasRole(val) {
    return false;
  }
}
class ConfigServiceStub {}
class DocumentServiceStub {
  getOpenOrders(): Observable<Order[]> {
    return new Observable(observer => {
      observer.next([]);
    });
  }
  findOrders(_term: string): Observable<Order[]> {
    return new Observable(observer => {
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
}
class PaymentServiceStub {}

describe("OrderTableComponent", () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub }
      ],
      declarations: [
        OrderTableComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(TranslatePipe)
      ]
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
