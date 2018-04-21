import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit {
  @Output() number = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  clickBtn(_number: string) {
    this.number.emit(_number);
  }
}
