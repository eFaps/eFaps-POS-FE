import { Component, OnInit } from '@angular/core';

import { Item } from '../model/index';
import { PosService } from '../services/index'

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  ticket: Item[];

  constructor(private posService: PosService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(data => this.ticket = data);
  }
}
