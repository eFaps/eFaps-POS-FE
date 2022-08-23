import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  AuthService,
  ConfigService,
  DocumentService,
  PaymentService,
  PosService,
  UtilsService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { CashComponent } from "./cash.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

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
  currentPayments = new Observable((observer) => {
    observer.next([]);
  });
  currentDocument = new Observable((observer) => {
    observer.next([]);
  });
  currentTotal = new Observable((observer) => {
    observer.next([]);
  });
}
class WorkspaceServiceStub {}

describe("CashComponent", () => {
  let component: CashComponent;
  let fixture: ComponentFixture<CashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        CashComponent,
        MockPipe(TranslatePipe),
        MockComponent(KeypadComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
