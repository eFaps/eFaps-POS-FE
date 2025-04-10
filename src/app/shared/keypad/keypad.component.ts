import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Subscription } from "rxjs";
import { KeypadService } from "../../services";

@Component({
  selector: "app-keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
  standalone: false,
})
export class KeypadComponent implements OnInit, OnDestroy {
  private keypadService = inject(KeypadService);

  @Input() showTopClear: boolean = true;
  @Input() showBottomClear: boolean = false;
  @Input() showDoubleZero: boolean = true;
  @Output() number = new EventEmitter<string>();
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.keypadService.currentKey.subscribe((data) => {
        this.clickBtn(data);
      }),
    );
  }

  clickBtn(_number: string) {
    this.number.emit(_number);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypadService.handleKeyboardEvent(event);
  }
}
