import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableModule } from "@angular/material/table";
import { PosCurrencyPipe } from "@efaps/pos-library";
import { MockPipe } from "ng-mocks";

import { ReassignItemComponent } from "./reassign-item.component";

describe("ReassignItemComponent", () => {
  let component: ReassignItemComponent;
  let fixture: ComponentFixture<ReassignItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MockPipe(PosCurrencyPipe),
        ReassignItemComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
