import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InventoryEntry, InventoryService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { InventoryTableComponent } from "./inventory-table.component";

class InventoryServiceStub {
  getInventory(): Observable<InventoryEntry[]> {
    return new Observable();
  }
}

describe("InventoryTableComponent", () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        InventoryTableComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: InventoryService, useClass: InventoryServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("warehouse", {
      oid: "08.15",
      name: "TestWareHouse",
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
