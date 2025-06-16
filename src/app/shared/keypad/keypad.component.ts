import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  inject,
  input
} from "@angular/core";
import { Subscription } from "rxjs";
import { KeypadService } from "../../services";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-keypad",
    templateUrl: "./keypad.component.html",
    styleUrls: ["./keypad.component.scss"],
    imports: [
        MatGridList,
        MatGridTile,
        MatButton,
        MatIcon,
    ],
})
export class KeypadComponent implements OnInit, OnDestroy {
  private keypadService = inject(KeypadService);

  readonly showTopClear = input<boolean>(true);
  readonly showBottomClear = input<boolean>(false);
  readonly showDoubleZero = input<boolean>(true);
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
