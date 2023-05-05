import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosService } from "@efaps/pos-library";

import { SharedModule } from "../../shared/shared.module";
import { SplitOrderDialogComponent } from "./split-order-dialog.component";

class PosServiceStub {}

describe("SplitOrderDialogComponent", () => {
  let component: SplitOrderDialogComponent;
  let fixture: ComponentFixture<SplitOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
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
      declarations: [SplitOrderDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
