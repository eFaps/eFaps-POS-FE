import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Balance, Invoice, Order, Payable, Receipt, Ticket } from '../model';
import { ConfigService } from './config.service';
import { WorkspaceService } from './workspace.service';

@Injectable()
export class DocumentService {
  private wsoid: string;

  constructor(private http: HttpClient, private config: ConfigService,
    workspaceService: WorkspaceService) {
    workspaceService.currentWorkspace.subscribe(_ws => {
      if (_ws) {
        this.wsoid = _ws.oid;
      }
    });
  }

  public createReceipt(_receipt: Receipt): Observable<Receipt> {
    const url = `${this.config.baseUrl}/workspaces/${this.wsoid}/documents/receipts`;
    return this.http.post<Receipt>(url, _receipt);
  }

  public createInvoice(_invoice: Invoice): Observable<Receipt> {
    const url = `${this.config.baseUrl}/workspaces/${this.wsoid}/documents/invoices`;
    return this.http.post<Invoice>(url, _invoice);
  }

  public createTicket(_ticket: Ticket): Observable<Receipt> {
    const url = `${this.config.baseUrl}/workspaces/${this.wsoid}/documents/tickets`;
    return this.http.post<Ticket>(url, _ticket);
  }

  public createOrder(_order: Order): Observable<Order> {
    const url = `${this.config.baseUrl}/documents/orders`;
    return this.http.post<Order>(url, _order);
  }

  public updateOrder(_order: Order): Observable<Order> {
    const url = `${this.config.baseUrl}/documents/orders/${_order.id}`;
    return this.http.put<Order>(url, _order);
  }

  public deleteOrder(_order: Order): Observable<void> {
    const url = `${this.config.baseUrl}/documents/orders/${_order.id}`;
    return this.http.delete<void>(url);
  }

  public getOrders(): Observable<Order[]> {
    const url = `${this.config.baseUrl}/documents/orders`;
    return this.http.get<Order[]>(url);
  }

  public getOpenOrders(): Observable<Order[]> {
    const url = `${this.config.baseUrl}/documents/orders`;
    const params = new HttpParams().set('status', 'OPEN');
    return this.http.get<Order[]>(url, { params: params });
  }

  public findOrders(_term: string): Observable<Order[]> {
    const url = `${this.config.baseUrl}/documents/orders`;
    const params = new HttpParams().set('term', _term);
    return this.http.get<Order[]>(url, { params: params });
  }

  public getOrders4Spots(): Observable<Order[]> {
    const params = new HttpParams().set('spot', 'true');
    const url = `${this.config.baseUrl}/documents/orders`;
    return this.http.get<Order[]>(url, { params: params });
  }

  public getDocuments4Balance(_balance: Balance): Observable<Payable[]> {
    const receipts = this.getReceipts4Balance(_balance);
    const invoices = this.getInvoicess4Balance(_balance);
    return forkJoin(receipts, invoices).pipe(map(([s1, s2]) => {
      s1.map(r => r.type = 'RECEIPT');
      s2.map(r => r.type = 'INVOICE');
      return [...s1, ...s2];
    }));
  }

  public getReceipts4Balance(_balance: Balance): Observable<Receipt[]> {
    const url = `${this.config.baseUrl}/documents/receipts`;
    const params = new HttpParams().set('balanceOid', _balance.oid ? _balance.oid : _balance.id);
    return this.http.get<Receipt[]>(url, { params: params });
  }

  public getInvoicess4Balance(_balance: Balance): Observable<Invoice[]> {
    const url = `${this.config.baseUrl}/documents/invoices`;
    const params = new HttpParams().set('balanceOid', _balance.oid ? _balance.oid : _balance.id);
    return this.http.get<Invoice[]>(url, { params: params });
  }
}
