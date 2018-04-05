import { Component, OnInit } from '@angular/core';
import { PosService, Item } from '../services/index'

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  ticket: Item[];

  constructor(private ticketSync: PosService) { }

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
  }
}
