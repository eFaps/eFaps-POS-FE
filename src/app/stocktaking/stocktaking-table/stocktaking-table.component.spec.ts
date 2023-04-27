import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingTableComponent } from "./stocktaking-table.component";

describe("StocktakingTableComponent", () => {
  let component: StocktakingTableComponent;
  let fixture: ComponentFixture<StocktakingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
