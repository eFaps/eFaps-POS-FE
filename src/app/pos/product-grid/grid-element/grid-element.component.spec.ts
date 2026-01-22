import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTabsModule } from "@angular/material/tabs";
import { ProductService } from "@efaps/pos-library";
import { beforeEach, describe, expect, it } from "vitest";

import { GridElementComponent } from "./grid-element.component";
class ProductServiceStub {}

describe("GridElementComponent", () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTabsModule, GridElementComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ProductService, useClass: ProductServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
