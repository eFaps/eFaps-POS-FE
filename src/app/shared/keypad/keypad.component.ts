import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent {
  @Input() showTopClear: boolean = true;
  @Input() showBottomClear: boolean = false;
  @Input() showDoubleZero: boolean = true;
  @Output() number = new EventEmitter<string>();
  regex = new RegExp("\\d")
  keyboardEvent: KeyboardEvent;
  block = false;
  constructor() { }

  clickBtn(_number: string) {
    this.number.emit(_number);
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.block) {
      this.keyboardEvent = null;
    } else {
      this.block = true;
      this.keyboardEvent = event;
      setTimeout(() => {
        if (this.keyboardEvent && this.regex.test(event.key)) {
          this.clickBtn(this.keyboardEvent.key);
        }
        this.block = false;
      }, 200);
    }
  }
}
