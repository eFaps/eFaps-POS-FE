import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingInitComponent } from "./stocktaking-init.component";

describe("StocktakingInitComponent", () => {
  let component: StocktakingInitComponent;
  let fixture: ComponentFixture<StocktakingInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingInitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
