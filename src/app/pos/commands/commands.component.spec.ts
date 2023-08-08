import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  PaymentService,
  PosConfigToken,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";
import { MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { CommandsComponent } from "./commands.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientTestingModule } from "@angular/common/http/testing";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBar },
      ],
      declarations: [
        CommandsComponent,
        MockDirective(TranslateDirective),
        MockPipe(TranslatePipe, (...args) => "Hallo"),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
