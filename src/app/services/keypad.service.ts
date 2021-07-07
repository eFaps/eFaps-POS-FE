import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class KeypadService {

  block = false;
  keyboardEvent: KeyboardEvent;
  regex = new RegExp("\\d")
  private currentSource = new BehaviorSubject<string>("");
  currentKey = this.currentSource.asObservable();
  deactivated = false

  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.deactivated) {
      return
    }
    if (this.block) {
      this.keyboardEvent = null;
    } else {
      this.block = true;
      this.keyboardEvent = event;
      setTimeout(() => {
        if (this.keyboardEvent && this.regex.test(event.key)) {
          this.currentSource.next(this.keyboardEvent.key)
        }
        this.block = false;
      }, 200);
    }
  }

  deactivate() {
    this.deactivated = true
  }
  activate() {
    this.deactivated = false
  }
}
