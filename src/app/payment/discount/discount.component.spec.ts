import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  AuthService,
  ConfigService,
  DocumentService,
  PaymentService,
  PosCurrencyPipe,
  PosService,
  UtilsService,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { MaterialModule } from "../../material/material.module";
import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { DiscountComponent } from "./discount.component";

class AuthServiceStub {}
class ConfigServiceStub {}
class DocumentServiceStub {}
class PosServiceStub {}
class UtilsServiceStub {
  getCurrencySymbol(som) {
    return "PEN";
  }
}
class PaymentServiceStub {
  currentPayments = new Observable(observer => {
    observer.next([]);
  });
  currentDocument = new Observable(observer => {
    observer.next([]);
  });
  currentTotal = new Observable(observer => {
    observer.next([]);
  });
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable(observer => {
    observer.next({
      discounts: []
    });
  });
}

describe("DiscountComponent", () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub }
      ],
      declarations: [
        DiscountComponent,
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe),
        MockComponent(KeypadComponent)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
