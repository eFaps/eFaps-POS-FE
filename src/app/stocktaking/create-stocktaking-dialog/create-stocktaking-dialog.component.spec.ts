import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import {
  InventoryService,
  PosConfigToken,
  StocktakingService,
} from "@efaps/pos-library";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog.component";
class InventoryServiceStub {
  getWarehouses() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

class StocktakingServiceStub {}

describe("CreateStocktakingDialogComponent", () => {
  let component: CreateStocktakingDialogComponent;
  let fixture: ComponentFixture<CreateStocktakingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, CreateStocktakingDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: InventoryService, useClass: InventoryServiceStub },
        { provide: StocktakingService, useClass: StocktakingServiceStub },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
