import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent, MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { MaterialModule } from "../material/material.module";

import {
  AuthService,
  MsgService,
  PosService,
  WorkspaceService,
  PosLayout
} from "@efaps/pos-library";
import { SharedModule } from "../shared/shared.module";
import { CommandsComponent } from "./commands/commands.component";
import { PosComponent } from "./pos.component";
import { ProductListComponent } from "./product-list/product-list.component";

import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";

class AuthServiceStub {
  getCurrentUsername() {
    return "blabla";
  }
}
class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentTicket = new Observable(observer => {
    observer.next({});
  });
}
class MsgServiceStub {
  currentOrder = new Observable(observer => {
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

describe("PosComponent", () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: MsgService, useClass: MsgServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub }
      ],
      declarations: [
        PosComponent,
        MockComponent(ProductGridComponent),
        MockComponent(ProductListComponent),
        MockComponent(TicketComponent),
        MockComponent(TotalsComponent),
        MockComponent(CommandsComponent)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
