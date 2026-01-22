import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { CalculatorService, DocumentService } from "@efaps/pos-library";
import { beforeEach, describe, expect, it } from "vitest";
import { SplitOrderDialogComponent } from "./split-order-dialog.component";

class DocumentServiceStub {}
class CalculatorServiceStub {}

describe("SplitOrderDialogComponent", () => {
  let component: SplitOrderDialogComponent;
  let fixture: ComponentFixture<SplitOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        SplitOrderDialogComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            items: [],
          },
        },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: CalculatorService, useClass: CalculatorServiceStub },
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
