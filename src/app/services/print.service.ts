import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../model/index';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  printPreview(_order: Order): Observable<any> {
    const requestUrl = `${this.config.baseUrl}/documents/orders/${_order.id}/printpreview`;
    return this.http.get(requestUrl, { responseType: 'blob' });
  }
}
