import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';
import {
  DocItem,
  DocStatus,
  Item,
  Order,
  Pos,
  Product,
  Receipt,
  Tax,
  TaxEntry
} from '../model/index';

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

  public currency = 'USD';
  private currencySource = new BehaviorSubject<string>(this.currency);
  currentCurrency = this.currencySource.asObservable();

  private currentPos: Pos;

  constructor(private http: HttpClient, private config: ConfigService,
    private workspaceService: WorkspaceService,
    private documentService: DocumentService) {

    this.workspaceService.currentWorkspace.subscribe(_data => {
      if (_data) {
        if (!(this.currentPos && this.currentPos.oid === _data.posOid)) {
          this.getPos(_data.posOid)
            .subscribe(_pos => {
              this.currentPos = _pos;
              this.currencySource.next(_pos.currency);
            });
          this.changeTicket([]);
        }
      }
    });
    this.currentTicket.subscribe(_ticket => this.ticket = _ticket);
    this.currentNetTotal.subscribe(_netTotal => this.netTotal = _netTotal);
    this.currentCrossTotal.subscribe(_crossTotal => this.crossTotal = _crossTotal);
    this.currentCurrency.subscribe(_currency => this.currency = _currency);
  }

  public getPoss(): Observable<Pos[]> {
    const url = `${this.config.baseUrl}/poss`;
    return this.http.get<Pos[]>(url);
  }

  public getPos(_oid: string): Observable<Pos> {
    const url = `${this.config.baseUrl}/poss/${_oid}`;
    return this.http.get<Pos>(url);
  }

  public setOrder(_order: Order) {
    this.orderSource.next(_order);
    const items: Item[] = [];
    _order.items.sort((a, b) => (a.index < b.index ? -1 : 1)).forEach(_item => {
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

  private calculateItems(_ticket: Item[]) {
    _ticket.forEach((_item: Item) => {
      _item.price = (_item.product.crossPrice * _item.quantity);
    });
  }

  private calculateTotals(_ticket: Item[]) {
    let net = 0;
    let cross = 0;
    const taxes = new Map<string, number>();
    _ticket.forEach((_item: Item) => {
      const itemNet = _item.product.netPrice * _item.quantity;
      net += itemNet;
      _item.product.taxes.forEach((_tax: Tax) => {
        const tax = itemNet * (_tax.percent / 100);
        if (!taxes.has(_tax.name)) {
          taxes.set(_tax.name, 0);
        }
        taxes.set(_tax.name, taxes.get(_tax.name) + tax);
        cross += itemNet + tax;
      });
    });
    this.netTotalSource.next(net);
    this.crossTotalSource.next(cross);
    this.taxesSource.next(taxes);
  }

  public createOrder(): Observable<Order> {
    return this.documentService.createOrder({
      id: null,
      oid: null,
      number: null,
      currency: this.currency,
      items: this.getDocItems(),
      status: DocStatus.OPEN,
      netTotal: this.netTotal,
      crossTotal: this.crossTotal,
      taxes: this.getTaxEntries()
    });
  }

  private getDocItems(): DocItem[] {
    return this.ticket.map((_item, _index) => <DocItem>{
      index: _index + 1,
      product: _item.product,
      quantity: _item.quantity,
      netUnitPrice: _item.product.netPrice,
      netPrice: _item.product.netPrice * _item.quantity,
      crossUnitPrice: _item.product.crossPrice,
      crossPrice: _item.price,
      taxes: this.getItemTaxEntries(_item)
    });
  }

  private getItemTaxEntries(_item: Item): TaxEntry[] {
    const entries: TaxEntry[] = [];
    _item.product.taxes.forEach((_tax: Tax) => {
      const netPrice = _item.product.netPrice * _item.quantity;
      const tax = netPrice * (_tax.percent / 100);
      entries.push({
        tax: _tax,
        base: netPrice,
        amount: tax
      });
    });
    return entries;
  }

  private getTaxEntries(): TaxEntry[] {
    const taxEntries: TaxEntry[] = [];
    const taxValues: Map<string, TaxEntry> = new Map();
    this.getDocItems().forEach(_item => {
      _item.taxes.forEach(_taxEntry => {
        if (!taxValues.has(_taxEntry.tax.name)) {
          taxValues.set(_taxEntry.tax.name, {
            tax: _taxEntry.tax,
            base: 0,
            amount: 0,
          });
        }
        const ce = taxValues.get(_taxEntry.tax.name);
        ce.amount = ce.amount + _taxEntry.amount;
        ce.base = ce.base + _taxEntry.base;
        taxValues.set(_taxEntry.tax.name, ce);
      });
    });
    taxValues.forEach((_value, _key) => {
      taxEntries.push(_value);
    });
    return taxEntries;
  }

  public updateOrder(_order: Order): Observable<Order> {
    return this.documentService.updateOrder(Object.assign(_order, {
      items: this.getDocItems(),
      netTotal: this.netTotal,
      crossTotal: this.crossTotal,
      taxes: this.getTaxEntries()
    }));
  }

  public calculateOrder(_order: Order): Order {
    const docItems = this.ticket.map((_item, _index) => <DocItem>{
      index: _order.items[_index].index,
      product: _item.product,
      quantity: _item.quantity,
      netUnitPrice: _item.product.netPrice,
      netPrice: _item.product.netPrice * _item.quantity,
      crossUnitPrice: _item.product.crossPrice,
      crossPrice: _item.price,
      taxes: this.getItemTaxEntries(_item)
    });
    return Object.assign(_order, {
      items: docItems,
      netTotal: this.netTotal,
      crossTotal: this.crossTotal,
      taxes: this.getTaxEntries()
    });
  }

  public reset() {
    this.changeTicket([]);
    this.orderSource.next(null);
  }
}
