import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  AuthService,
  InventoryService,
  PaymentService,
  PosConfigToken,
  PosService,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";
import { MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CommandsComponent } from "./commands.component";

class PosServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next({});
  });
  currentTicket = new Observable((observer) => {
    observer.next({});
  });
}
class PaymentServiceStub {
  currentDocument = new Observable((observer) => {
    observer.next({});
  });
  currentPayments = new Observable((observer) => {
    observer.next([]);
  });
  currentTotal = new Observable((observer) => {
    observer.next({});
  });
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      docTypes: [],
    });
  });
  showInventory = function () {
    return false;
  };
}

describe("CommandsComponent", () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommandsComponent,
        MockDirective(TranslateDirective),
        MockPipe(TranslatePipe, (...args) => "Hallo"),
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: InventoryService, useValue: {} },
        { provide: ProductService, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBar },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
