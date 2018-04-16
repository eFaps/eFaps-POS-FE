import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';
import { DocItem, DocStatus, Item, Order, Pos, Product, Receipt, Tax } from '../model/index';

@Injectable()
export class PosService {

  private order: Order;
  private orderSource = new BehaviorSubject<Order>(this.order);
  currentOrder = this.orderSource.asObservable();

  private ticket: Item[] = [];
  private ticketSource = new BehaviorSubject<Item[]>(this.ticket);
  currentTicket = this.ticketSource.asObservable();

  private netTotal = 0;
  private netTotalSource = new BehaviorSubject<number>(this.netTotal);
  currentNetTotal = this.netTotalSource.asObservable();

  private taxes: Map<string, number> = new Map();
  private taxesSource = new BehaviorSubject<Map<string, number>>(this.taxes);
  currentTaxes = this.taxesSource.asObservable();

  private crossTotal = 0;
  private crossTotalSource = new BehaviorSubject<number>(this.crossTotal);
  currentCrossTotal = this.crossTotalSource.asObservable();

  private currentPos: Pos;

  constructor(private http: HttpClient, private config: ConfigService,
    private workspaceService: WorkspaceService,
    private documentService: DocumentService) {

    this.workspaceService.currentWorkspace.subscribe(_data => {
      if (_data) {
        if (!(this.currentPos && this.currentPos.oid === _data.posOid)) {
          this.getPos(_data.posOid)
            .subscribe(_pos => this.currentPos = _pos);
          this.changeTicket([]);
        }
      }
    });
    this.currentTicket.subscribe(_ticket => this.ticket = _ticket);
  }

  public getPos(_oid: string): Observable<Pos> {
    const url = `${this.config.baseUrl}/poss/${_oid}`;
    return this.http.get<Pos>(url);
  }

  changeOrder(_order: Order) {
    this.orderSource.next(_order);
    const items: Item[] = [];
    _order.items.sort((a, b) => (a < b ? -1 : 1)).forEach(_item => {
      items.push({
        product: _item.product,
        quantity: _item.quantity,
        price: _item.crossPrice
      });
    });
    this.changeTicket(items);
  }

  changeTicket(_ticket: Item[]) {
    this.calculateItems(_ticket);
    this.calculateTotals(_ticket);
    this.ticketSource.next(_ticket);
  }

  calculateItems(_ticket: Item[]) {
    _ticket.forEach((_item: Item) => {
      _item.price = (_item.product.crossPrice * _item.quantity);
    });
  }

  calculateTotals(_ticket: Item[]) {
    let net = 0;
    let cross = 0;
    const taxes = new Map<string, number>();
    _ticket.forEach((_item: Item) => {
      net += _item.price;
      _item.product.taxes.forEach((_tax: Tax) => {
        const tax = _item.price * (_tax.percent / 100);
        if (!taxes.has(_tax.name)) {
          taxes.set(_tax.name, 0);
        }
        taxes.set(_tax.name, taxes.get(_tax.name) + tax);
        cross += _item.price + tax;
      });
    });
    this.netTotalSource.next(net);
    this.crossTotalSource.next(cross);
    this.taxesSource.next(taxes);
  }

  createOrder(): Observable<Order> {
    return this.documentService.createOrder({
      id: null,
      oid: null,
      number: null,
      items: this.ticket.map((_item, _index) => <DocItem>{
        index: _index + 1,
        product: _item.product,
        quantity: _item.quantity,
        netPrice: _item.price,
        netUnitPrice: _item.price,
        crossPrice: _item.price,
        crossUnitPrice: _item.price,
      }),
      status: DocStatus.OPEN
    });
  }

  updateOrder(_order: Order): Observable<Order> {
    return this.documentService.updateOrder(Object.assign(_order, {
      items: this.ticket.map((_item, _index) => <DocItem>{
        index: _index + 1,
        product: _item.product,
        quantity: _item.quantity,
        netPrice: _item.price,
        netUnitPrice: _item.price,
        crossPrice: _item.price,
        crossUnitPrice: _item.price,
      }),
    }));
  }

  reset() {
    this.changeTicket([]);
    this.orderSource.next(null);
  }
}
