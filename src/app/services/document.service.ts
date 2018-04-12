import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ConfigService } from './config.service';
import { WorkspaceService } from './workspace.service';

import { Invoice, Order, Receipt } from '../model/index';

@Injectable()
export class DocumentService {
  private wsoid: string;

  constructor(private http: HttpClient, private config: ConfigService,
    private workspaceService: WorkspaceService) {
    workspaceService.currentWorkspace.subscribe(_ws => { if (_ws) { this.wsoid = _ws.oid; } });
  }

  public createReceipt(_receipt: Order): Observable<Receipt> {
    const url = `${this.config.baseUrl}/workspaces/${this.wsoid}/documents/receipts`;
    return this.http.post<Receipt>(url, _receipt);
  }

  public createOrder(_order: Order): Observable<Order> {
    const url = `${this.config.baseUrl}/documents/orders`;
    return this.http.post<Order>(url, _order);
  }

  public updateOrder(_order: Order): Observable<Order> {
    const url = `${this.config.baseUrl}/documents/orders/${_order.id}`;
    return this.http.put<Order>(url, _order);
  }

  public createInvoice(_invoice: Order): Observable<Invoice> {
    const url = `${this.config.baseUrl}/workspaces/${this.wsoid}/documents/invoices`;
    return this.http.post<Invoice>(url, _invoice);
  }

  public getOrders(): Observable<Order[]> {
    const url = `${this.config.baseUrl}/documents/orders`;
    return this.http.get<Order[]>(url);
  }
}
