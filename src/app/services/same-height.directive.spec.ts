import { Component, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SameHeightDirective } from "./same-height.directive";

export class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
}

@Component({ template: ` <div [appSameHeight]="aClassName"></div> ` })
class HostComponent {}

describe("SameHeightDirective", () => {
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SameHeightDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("should create an instance", () => {
    expect(fixture).toBeTruthy();
  });
});
