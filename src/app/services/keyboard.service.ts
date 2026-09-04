import { Injectable, signal } from "@angular/core";
import Keyboard from "simple-keyboard";

@Injectable({
  providedIn: "root",
})
export class KeyboardService {
  private keyboard!: Keyboard;
  private activeInputElement: HTMLInputElement | HTMLTextAreaElement | null =
    null;
  hidden = signal<boolean>(false);
  enabled = signal<boolean>(false);

  initKeyboard() {
    this.keyboard = new Keyboard({
      onChange: (input: string) => this.handleOnChange(input),
      onKeyPress: (button: string) => this.handleOnKeyPress(button),
    });
  }

  setActiveInput(element: HTMLInputElement | HTMLTextAreaElement) {
    this.activeInputElement = element;
    if (this.keyboard) {
      this.hidden.set(false);
      this.keyboard.setInput(this.activeInputElement.value);
    }
  }

  private handleOnChange(input: string) {
    if (this.enabled() && this.activeInputElement) {
      this.activeInputElement.value = input;
      this.activeInputElement.dispatchEvent(
        new Event("input", { bubbles: true }),
      );
    }
  }

  private handleOnKeyPress(button: string) {
    if (this.enabled() && this.activeInputElement) {
      if (button === "{shift}" || button === "{lock}") {
        this.toggleShiftLayout();
      }
    }
  }

  private toggleShiftLayout() {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === "default" ? "shift" : "default";
    this.setOptions({ layoutName: shiftToggle });
  }

  setOptions(options: any) {
    if (this.keyboard) {
      this.keyboard.setOptions(options);
    }
  }

  set enable(enable: boolean) {
    this.enabled.set(enable);
  }

  clickedOutside(target: EventTarget | null) {
    if (target == null || !(this.activeInputElement == target)) {
      this.hidden.set(true);
    }
  }
}
