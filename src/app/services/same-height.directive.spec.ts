import { ElementRef } from "@angular/core";
import { SameHeightDirective } from "./same-height.directive";

class MockElementRef extends ElementRef {
  constructor() {
    super({})
  }
}

describe("SameHeightDirective", () => {
  it("should create an instance", () => {
    const directive = new SameHeightDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
