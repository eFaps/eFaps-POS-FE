import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTabsModule } from "@angular/material/tabs";

import { ProductService } from "@efaps/pos-library";
import { GridElementComponent } from "./grid-element.component";

class ProductServiceStub {}

describe("GridElementComponent", () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MatTabsModule, GridElementComponent],
    providers: [{ provide: ProductService, useClass: ProductServiceStub }],
}).compileComponents();

    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
