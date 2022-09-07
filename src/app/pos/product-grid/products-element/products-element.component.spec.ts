import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsElementComponent } from "./products-element.component";

describe("ProductsElementComponent", () => {
  let component: ProductsElementComponent;
  let fixture: ComponentFixture<ProductsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
