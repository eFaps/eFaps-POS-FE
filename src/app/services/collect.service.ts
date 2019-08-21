import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Collector, CollectOrder } from '../model/collector';
import { Decimal } from 'decimal.js';

@Injectable({
  providedIn: 'root'
})
export class CollectService {


  constructor(private http: HttpClient, private config: ConfigService) { }

  getCollectors() {
    const requestUrl = `${this.config.baseUrl}/collectors/`;
    return this.http.get<Collector[]>(requestUrl);
  }

  collect(key: string, amount: number): any {
    const amountStr = new Decimal(amount).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toString();
    const collectOrder = { amount: amountStr };
    const url = `${this.config.baseUrl}/collectors/${key}`;
    return this.http.post<CollectOrder>(url, collectOrder);
  }

}
