import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CloseStocktakingDialogComponent } from "./close-stocktaking-dialog.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PosConfigToken } from "@efaps/pos-library";

describe("CloseStocktakingDialogComponent", () => {
  let component: CloseStocktakingDialogComponent;
  let fixture: ComponentFixture<CloseStocktakingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CloseStocktakingDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: PosConfigToken, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseStocktakingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
