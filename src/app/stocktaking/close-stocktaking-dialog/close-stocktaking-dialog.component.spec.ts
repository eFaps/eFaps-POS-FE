import { ComponentFixture, TestBed } from "@angular/core/testing";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PosConfigToken, StocktakingService } from "@efaps/pos-library";
import { CloseStocktakingDialogComponent } from "./close-stocktaking-dialog.component";

describe("CloseStocktakingDialogComponent", () => {
  let component: CloseStocktakingDialogComponent;
  let fixture: ComponentFixture<CloseStocktakingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CloseStocktakingDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: PosConfigToken, useValue: {} },
        { provide: StocktakingService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
