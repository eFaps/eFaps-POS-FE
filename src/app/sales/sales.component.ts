import { Component, OnInit } from '@angular/core';
import { PosService, Item } from '../services/index'

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  ticket: Item[];
  
  constructor(private ticketSync: PosService) { }

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
  }

}
