import { ElementRef } from "@angular/core";
import { MatKeyboardService } from "@efaps/angular-onscreen-material-keyboard";
import { VirtKeyboardDirective } from "./virt-keyboard.directive";
class MockElementRef extends ElementRef {
  constructor() {
    super({});
  }
}
class MockMatKeyboardService extends MatKeyboardService {}

describe("VirtKeyboardDirective", () => {
  it("should create an instance", () => {
    const directive = new VirtKeyboardDirective(
      new MockElementRef(),
      undefined,
      undefined,
    );
    expect(directive).toBeTruthy();
  });
});
