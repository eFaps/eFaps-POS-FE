import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideNativeDateAdapter } from "@angular/material/core";
import { beforeEach, describe, expect, it } from "vitest";
import { SalesReportDialogComponent } from "./sales-report-dialog.component";

describe("SalesReportDialogComponent", () => {
  let component: SalesReportDialogComponent;
  let fixture: ComponentFixture<SalesReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideZonelessChangeDetection(), provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
