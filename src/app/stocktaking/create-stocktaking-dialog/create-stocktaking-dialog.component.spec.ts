import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog.component";
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { FormBuilder } from "@angular/forms";
import { PosConfigToken } from "@efaps/pos-library";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CreateStocktakingDialogComponent", () => {
  let component: CreateStocktakingDialogComponent;
  let fixture: ComponentFixture<CreateStocktakingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStocktakingDialogComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStocktakingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
