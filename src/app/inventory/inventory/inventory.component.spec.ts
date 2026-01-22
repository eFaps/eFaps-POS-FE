import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTabsModule } from "@angular/material/tabs";
import { InventoryService } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InventoryTableComponent } from "../inventory-table/inventory-table.component";
import { InventoryComponent } from "./inventory.component";

class InventoryServiceStub {
  getWarehouses() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("InventoryComponent", () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        InventoryComponent,
        MockComponent(InventoryTableComponent),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: InventoryService, useClass: InventoryServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
