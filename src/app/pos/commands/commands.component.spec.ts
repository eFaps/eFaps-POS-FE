import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  PaymentService,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";
import { MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { CommandsComponent } from "./commands.component";

class PosServiceStub {
  currentOrder = new Observable((observer) => {
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
}

describe("CommandsComponent", () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, MatDialogModule],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
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
