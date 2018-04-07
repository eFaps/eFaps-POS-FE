import { Component, OnInit } from '@angular/core';
import { PosService } from '../services/index'
import { Item } from '../model/index';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  ticket: Item[];

  constructor(private posService: PosService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(data => this.ticket = data);
  }
}
