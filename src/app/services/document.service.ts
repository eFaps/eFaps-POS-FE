import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ConfigService } from './config.service';
import { WorkspaceService } from './workspace.service';

import { Invoice, Order, Receipt, Ticket } from '../model/index';

@Injectable()
export class DocumentService {
  private wsoid: string;

  constructor(private http: HttpClient, private config: ConfigService,
    private workspaceService: WorkspaceService) {
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

  public getOrders4Spots(): Observable<Order[]> {
    const url = `${this.config.baseUrl}/documents/orders`;
    const params = new HttpParams().set('spot', 'true');
    return this.http.get<Order[]>(url, { params: params });
  }
}
