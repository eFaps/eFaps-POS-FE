import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';

import { Item } from '../model/index';
import { MsgService, PosService } from '../services/index'

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  ticket: Item[];
  screenHeight: number;
  screenWidth: number;
  private orderId: string;

  constructor(private posService: PosService, private msgService: MsgService) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(data => this.ticket = data);
    this.onResize();
    this.msgService.init();
    this.posService.currentOrder.subscribe(order => {
      if (order && !this.orderId) {
        this.msgService.publishStartEditOrder(order.id);
        this.orderId = order.id;
      }
    });
  }

  ngOnDestroy() {
    if (this.orderId) {
      this.msgService.publishFinishEditOrder(this.orderId);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}
