import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

import { GridElementComponent } from "./grid-element.component";

describe("GridElementComponent", () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTabsModule],
      declarations: [GridElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
