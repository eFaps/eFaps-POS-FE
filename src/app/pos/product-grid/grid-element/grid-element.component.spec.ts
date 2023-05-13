import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTabsModule } from "@angular/material/tabs";

import { GridElementComponent } from "./grid-element.component";
import { ProductService } from "@efaps/pos-library";

class ProductServiceStub {}

describe("GridElementComponent", () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTabsModule],
      declarations: [GridElementComponent],
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
