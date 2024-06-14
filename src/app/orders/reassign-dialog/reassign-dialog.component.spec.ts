import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import {
  CalculatorService,
  DocumentService,
  Order,
  PosConfigToken,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

import { ReassignItemComponent } from "../reassign-item/reassign-item.component";
import { ReassignDialogComponent } from "./reassign-dialog.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

class DocumentServiceStub {
  getOpenOrders(): Observable<Order[]> {
    return new Observable();
  }
}

describe("ReassignDialogComponent", () => {
  let component: ReassignDialogComponent;
  let fixture: ComponentFixture<ReassignDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(ReassignItemComponent),
        ReassignDialogComponent,
      ],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: CalculatorService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
