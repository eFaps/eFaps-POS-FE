import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
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
import { beforeEach, describe, expect, it } from "vitest";
import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { CashComponent } from "./cash.component";

class AuthServiceStub {}
class ConfigServiceStub {}
class DocumentServiceStub {}
class PosServiceStub {}
class UtilsServiceStub {
  getCurrencySymbol(som: any) {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        CashComponent,
        MockPipe(TranslatePipe),
        MockComponent(KeypadComponent),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
