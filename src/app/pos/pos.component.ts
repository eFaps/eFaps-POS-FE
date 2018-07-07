import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Item, PosLayout } from '../model/index';
import { AuthService, MsgService, PosService, WorkspaceService } from '../services/index';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, OnDestroy {
  PosLayout = PosLayout;
  ticket: Item[];
  screenHeight: number;
  screenWidth: number;
  private orderId: string;
  currentLayout: PosLayout = PosLayout.GRID;

  constructor(private posService: PosService, private msgService: MsgService,
    private workspaceService: WorkspaceService,
    private authService: AuthService) { }

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
    if (this.workspaceService.getPosLayout() === PosLayout.BOTH) {
      const posLayoutStr = localStorage.getItem('posLayout');
      const posLayout = JSON.parse(posLayoutStr)[this.authService.getCurrentUsername()];
      if (posLayout) {
        this.currentLayout = posLayout;
      }
    } else {
      this.currentLayout = this.workspaceService.getPosLayout();
    }
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

  switchLayout() {
    if (this.currentLayout === PosLayout.GRID) {
      this.currentLayout = PosLayout.LIST;
    } else {
      this.currentLayout = PosLayout.GRID;
    }
    this.storeCurrentLayout();
  }

  private storeCurrentLayout() {
    const posLayoutStr = localStorage.getItem('posLayout');
    let posLayouts;
    if (posLayoutStr) {
      posLayouts = JSON.parse(posLayoutStr);
    } else {
      posLayouts = {};
    }
    posLayouts[this.authService.getCurrentUsername()] = this.currentLayout;
    localStorage.setItem('posLayout', JSON.stringify(posLayouts));
  }
}
