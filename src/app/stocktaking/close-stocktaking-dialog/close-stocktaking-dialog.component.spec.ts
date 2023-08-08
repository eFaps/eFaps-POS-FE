import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CloseStocktakingDialogComponent } from "./close-stocktaking-dialog.component";

describe("CloseStocktakingDialogComponent", () => {
  let component: CloseStocktakingDialogComponent;
  let fixture: ComponentFixture<CloseStocktakingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseStocktakingDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseStocktakingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
