import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';
import {
  DocItem,
  DocStatus,
  Item,
  Order,
  Pos,
  Tax,
  TaxEntry
} from '../model/index';
import { Decimal } from 'decimal.js';

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

  public setOrder(order: Order) {
    if (order.discount) {
      order.items = order.items.filter(item => item.product.oid != order.discount.productOid);
      order.discount = null;
    }
    this.orderSource.next(order);
    const items: Item[] = [];
    order.items.sort((a, b) => (a.index < b.index ? -1 : 1)).forEach(_item => {
      items.push({
        product: _item.product,
        quantity: _item.quantity,
        price: _item.crossPrice
      });
    });
    this.changeTicket(items);
  }

  changeTicket(ticket: Item[]) {
    this.calculateItems(ticket);
    this.calculateTotals(ticket);
    this.ticketSource.next(ticket);
  }

  private calculateItems(ticket: Item[]) {
    ticket.forEach((item: Item) => {
      item.price = new Decimal(item.product.crossPrice).mul(new Decimal(item.quantity))
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
    });
  }

  private calculateTotals(ticket: Item[]) {
    let net = new Decimal(0);
    let cross = new Decimal(0);
    const taxes = new Map<string, Decimal>();
    ticket.forEach((item: Item) => {
      const itemNet = new Decimal(item.product.netPrice).mul(new Decimal(item.quantity));
      net = net.plus(itemNet);
      cross = cross.plus(itemNet);
      item.product.taxes.forEach((tax: Tax) => {
        const taxAmount = itemNet.mul(new Decimal(tax.percent).div(new Decimal(100)));
        if (!taxes.has(tax.name)) {
          taxes.set(tax.name, new Decimal(0));
        }
        taxes.set(tax.name, taxes.get(tax.name).plus(taxAmount));
        cross = cross.plus(taxAmount);
      });
    });
    this.netTotalSource.next(net.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber());
    this.crossTotalSource.next(cross.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber());
    const taxesNum = new Map<string, number>();
    taxes.forEach((val, key) => {
      taxesNum.set(key, val.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber())
    });
    this.taxesSource.next(taxesNum);
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
      taxes: this.getTaxEntries(),
      discount: null
    });
  }

  private getDocItems(): DocItem[] {
    return this.ticket
      .map((item, index) => <DocItem>{
        index: index + 1,
        product: item.product,
        quantity: item.quantity,
        netUnitPrice: item.product.netPrice,
        netPrice: new Decimal(item.product.netPrice).mul(new Decimal(item.quantity))
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber(),
        crossUnitPrice: item.product.crossPrice,
        crossPrice: item.price,
        taxes: this.getItemTaxEntries(item)
      });
  }

  private getItemTaxEntries(item: Item): TaxEntry[] {
    const entries: TaxEntry[] = [];
    item.product.taxes.forEach((_tax: Tax) => {
      const netPrice = new Decimal(item.product.netPrice).mul(new Decimal(item.quantity))
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
      const taxAmount = netPrice.mul(new Decimal(_tax.percent).div(new Decimal(100)))
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
      entries.push({
        tax: _tax,
        base: netPrice.toNumber(),
        amount: taxAmount.toNumber()
      });
    });
    return entries;
  }

  private getTaxEntries(): TaxEntry[] {
    const taxEntries: TaxEntry[] = [];
    const taxValues: Map<string, TaxEntry> = new Map();
    this.getDocItems().forEach(item => {
      item.taxes.forEach(taxEntry => {
        if (!taxValues.has(taxEntry.tax.name)) {
          taxValues.set(taxEntry.tax.name, {
            tax: taxEntry.tax,
            base: 0,
            amount: 0,
          });
        }
        const ce = taxValues.get(taxEntry.tax.name);
        ce.amount = new Decimal(ce.amount).plus(new Decimal(taxEntry.amount))
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
        ce.base = new Decimal(ce.base).plus(new Decimal(taxEntry.base))
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
        taxValues.set(taxEntry.tax.name, ce);
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
      taxes: this.getTaxEntries(),
    }));
  }

  public calculateOrder(order: Order): Order {
    const docItems = this.ticket.map((item, index) => <DocItem>{
      index: order.items[index].index,
      product: item.product,
      quantity: item.quantity,
      netUnitPrice: item.product.netPrice,
      netPrice: new Decimal(item.product.netPrice).mul(new Decimal(item.quantity))
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber(),
      crossUnitPrice: item.product.crossPrice,
      crossPrice: item.price,
      taxes: this.getItemTaxEntries(item)
    });
    return Object.assign(order, {
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
