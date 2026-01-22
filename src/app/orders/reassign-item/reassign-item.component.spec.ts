import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableModule } from "@angular/material/table";
import { beforeEach, describe, expect, it } from "vitest";
import { ReassignItemComponent } from "./reassign-item.component";

describe("ReassignItemComponent", () => {
  let component: ReassignItemComponent;
  let fixture: ComponentFixture<ReassignItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, ReassignItemComponent],
      providers: [provideZonelessChangeDetection()],
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
