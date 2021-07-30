import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PartListRelationComponent } from "./part-list-relation.component";
import { ProductService } from "@efaps/pos-library";

class ProductServiceStub { }

describe("PartListRelationComponent", () => {
  let component: PartListRelationComponent;
  let fixture: ComponentFixture<PartListRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartListRelationComponent],
      providers: [{ provide: ProductService, useClass: ProductServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
