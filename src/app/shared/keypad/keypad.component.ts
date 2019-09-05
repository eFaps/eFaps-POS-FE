import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit, OnDestroy {
  @Input() showTopClear: boolean = true;
  @Input() showBottomClear: boolean = false;
  @Input() showDoubleZero: boolean = true;
  @Output() number = new EventEmitter<string>();
  private hotkeys: Hotkey[] = [];

  constructor(private hotkeysService: HotkeysService) { }

  ngOnInit() {
    for (var i = 0; i < 10; i++) {
      const existing = this.hotkeysService.get('' + i);
      if (existing) {
        this.hotkeysService.remove(existing);
      }
      this.hotkeys.push(new Hotkey('' + i, (event: KeyboardEvent): boolean => {
        this.clickBtn(event.key);
        return false;
      }));
    }
    this.hotkeys.forEach(hotKey => {
      this.hotkeysService.add(hotKey);
    });
  }

  ngOnDestroy() {
    this.hotkeys.forEach(hotKey => {
      this.hotkeysService.remove(hotKey);
    });
  }

  clickBtn(_number: string) {
    this.number.emit(_number);
  }
}
