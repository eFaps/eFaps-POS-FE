import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductRelationType, ProductService } from "@efaps/pos-library";
import { beforeEach, describe, expect, it } from "vitest";

import { PartListRelationComponent } from "./part-list-relation.component";
class ProductServiceStub {}

describe("PartListRelationComponent", () => {
  let component: PartListRelationComponent;
  let fixture: ComponentFixture<PartListRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PartListRelationComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ProductService, useClass: ProductServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListRelationComponent);
    component = fixture.componentInstance;
    component._productRelation = {
      type: ProductRelationType.ALTERNATIVE,
      label: "",
      productOid: "",
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
