import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog.component";
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { FormBuilder } from "@angular/forms";
import { InventoryService, PosConfigToken, StocktakingService, Warehouse } from "@efaps/pos-library";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable } from "rxjs";

class InventoryServiceStub {
  getWarehouses() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

class StocktakingServiceStub {
  
}

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
        { provide: InventoryService, useClass: InventoryServiceStub },
        { provide: StocktakingService, useClass: StocktakingServiceStub},
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
