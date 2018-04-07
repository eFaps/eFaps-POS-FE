import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ConfigService } from './config.service';
import { Receipt } from '../model/index';

@Injectable()
export class DocumentService {

   constructor(private http: HttpClient, private config: ConfigService) { }

   public createReceipt(_receipt: Receipt): Observable<Receipt> {
     const url = `${this.config.baseUrl}/documents/receipts`;
     return this.http.post<Receipt>(url, _receipt);
   }
}
