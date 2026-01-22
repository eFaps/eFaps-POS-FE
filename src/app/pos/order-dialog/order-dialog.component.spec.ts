import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { PrintService, WorkspaceService } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrderDialogComponent } from "./order-dialog.component";

class PrintServiceStub {}
class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      docTypes: [],
      printCmds: [],
      oid: "wsOid",
    });
  });
}

describe("OrderDialogComponent", () => {
  let component: OrderDialogComponent;
  let fixture: ComponentFixture<OrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, OrderDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            order: "",
          },
        },
        { provide: PrintService, useClass: PrintServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
