import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { KeypadService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent implements OnInit, OnDestroy {
  @Input() showTopClear: boolean = true;
  @Input() showBottomClear: boolean = false;
  @Input() showDoubleZero: boolean = true;
  @Output() number = new EventEmitter<string>();
  private subscriptions = new Subscription();
  constructor(private keypadService: KeypadService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.keypadService.currentKey.subscribe((data) => {
        this.clickBtn(data)
      })
    );
  }

  clickBtn(_number: string) {
    this.number.emit(_number);
  }

  ngOnDestroy() {

    this.subscriptions.unsubscribe();
  }


  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypadService.handleKeyboardEvent(event)
  }
}
