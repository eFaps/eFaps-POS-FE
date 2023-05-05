import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingTableComponent } from "./stocktaking-table.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { HttpClientModule } from "@angular/common/http";
import { PosConfigToken } from "@efaps/pos-library";

describe("StocktakingTableComponent", () => {
  let component: StocktakingTableComponent;
  let fixture: ComponentFixture<StocktakingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingTableComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [{ provide: PosConfigToken, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
