import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorage } from 'ngx-store';

import { Item, PosLayout } from '../model/index';
import { AuthService, MsgService, PosService, WorkspaceService } from '../services/index';
import { AbstractProductSelector } from './abstract-product-selector';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, OnDestroy {
  PosLayout = PosLayout;
  multiplierForm: FormGroup;
  ticket: Item[];
  screenHeight: number;
  screenWidth: number;
  private orderId: string;
  currentLayout: PosLayout = PosLayout.GRID;
  @LocalStorage() posLayouts: any = {};
  numPad = false;
  @LocalStorage() posNumPad: any = {};
  multiplier = 1;

  constructor(public workspaceService: WorkspaceService,
    private posService: PosService,
    private msgService: MsgService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.multiplierForm = this.fb.group({
      'multiplier': [''],
    });
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
      const layout = this.posLayouts[this.authService.getCurrentUsername()];
      if (layout) {
        this.currentLayout = layout;
      }
    } else {
      this.currentLayout = this.workspaceService.getPosLayout();
    }
    this.numPad = this.posNumPad[this.authService.getCurrentUsername()]
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
    this.posLayouts[this.authService.getCurrentUsername()] = this.currentLayout;
    this.posLayouts.save();
  }

  setMultiplier(_number: string) {
    let multi;
    switch (_number) {
      case 'clear':
        multi = '';
        break;
      default:
        multi = '' + this.multiplierForm.value.multiplier + _number;
        break;
    }
    this.multiplierForm.patchValue({ 'multiplier': multi });
    this.multiplier = Number(multi);
  }

  resetMultiplier() {
    this.multiplier = 0;
    this.multiplierForm.patchValue({ 'multiplier': '' });
  }

  toggleNumPad() {
    this.numPad = !this.numPad;
    this.posNumPad[this.authService.getCurrentUsername()] = this.numPad;
    this.posNumPad.save();
  }
}
