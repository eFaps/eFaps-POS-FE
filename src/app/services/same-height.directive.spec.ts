import {
  Component,
  ElementRef,
  NO_ERRORS_SCHEMA,
  provideZonelessChangeDetection,
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { SameHeightDirective } from "./same-height.directive";
export class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
}

@Component({
  template: ` <div [appSameHeight]="aClassName"></div> `,
  imports: [SameHeightDirective],
})
class HostComponent {}

describe("SameHeightDirective", () => {
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SameHeightDirective, HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("should create an instance", () => {
    expect(fixture).toBeTruthy();
  });
});
