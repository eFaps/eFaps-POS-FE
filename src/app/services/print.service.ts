import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order, PrintResponse } from '../model/index';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  printJobs(_workspaceOid: string, _order: Order): Observable<PrintResponse[]> {
    const requestUrl = `${this.config.baseUrl}/print/jobs`;
    const params = new HttpParams().set('documentId', _order.id)
      .set('workspaceOid', _workspaceOid);
    return this.http.post<PrintResponse[]>(requestUrl, null, { params: params });
  }

  getPreview(_key: string): Observable<any> {
    const requestUrl = `${this.config.baseUrl}/print/preview/${_key}`;
    return this.http.get(requestUrl, { responseType: 'blob' });
  }

}
