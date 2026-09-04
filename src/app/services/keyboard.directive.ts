import { Directive, ElementRef, HostListener, inject } from "@angular/core";

import { KeyboardService } from "./keyboard.service";

@Directive({
  selector: "input[virtualKeyboard], textarea[virtualKeyboard]",
})
export class KeyboardDirective {
  private el = inject(ElementRef);
  private keyboardService = inject(KeyboardService);

  @HostListener("focus")
  onFocus() {
    this.keyboardService.setActiveInput(this.el.nativeElement);
  }
}
