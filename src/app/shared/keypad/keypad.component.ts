import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit {
  @Input() showTopClear: boolean = true;
  @Input() showBottomClear: boolean = false;
  @Output() number = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log();
  }


  clickBtn(_number: string) {
    this.number.emit(_number);
  }
}
