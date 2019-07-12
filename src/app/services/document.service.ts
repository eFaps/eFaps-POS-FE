import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, merge } from 'rxjs';
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
    return merge(
      this.getReceipts4Balance(_balance),
      this.getInvoices4Balance(_balance),
      this.getTickets4Balance(_balance)
    );
  }

  private getReceipts4Balance(_balance: Balance): Observable<Payable[]> {
    const url = `${this.config.baseUrl}/documents/receipts`;
    const params = new HttpParams().set('balanceOid', _balance.oid ? _balance.oid : _balance.id);
    return this.http.get<Receipt[]>(url, { params: params })
      .pipe(map(docs => {
        docs.map(doc => {
          doc.type = 'RECEIPT';
        })
        return [...docs]
      }))
  }

  private getInvoices4Balance(_balance: Balance): Observable<Payable[]> {
    const url = `${this.config.baseUrl}/documents/invoices`;
    const params = new HttpParams().set('balanceOid', _balance.oid ? _balance.oid : _balance.id);
    return this.http.get<Invoice[]>(url, { params: params })
      .pipe(map(docs => {
        docs.map(doc => {
          doc.type = 'INVOICE';
        })
        return [...docs]
      }));
  }

  private getTickets4Balance(_balance: Balance): Observable<Payable[]> {
    const url = `${this.config.baseUrl}/documents/tickets`;
    const params = new HttpParams().set('balanceOid', _balance.oid ? _balance.oid : _balance.id);
    return this.http.get<Ticket[]>(url, { params: params })
      .pipe(map(docs => {
        docs.map(doc => {
          doc.type = 'TICKET';
        })
        return [...docs]
      }))
  }
}
