import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosService } from "@efaps/pos-library";

import { SharedModule } from "../../shared/shared.module";
import { SplitOrderDialogComponent } from "./split-order-dialog.component";

class PosServiceStub {}

describe("SplitOrderDialogComponent", () => {
  let component: SplitOrderDialogComponent;
  let fixture: ComponentFixture<SplitOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        SplitOrderDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            items: [],
          },
        },
        { provide: PosService, useClass: PosServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
