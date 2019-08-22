import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Collector } from '../model/collector';
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

  startCollect(key: string, amount: number) {
    const amountStr = new Decimal(amount).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toString();
    const collectOrder = { amount: amountStr };
    const url = `${this.config.baseUrl}/collectors/${key}/start`;
    return this.http.post(url, collectOrder, { responseType: 'text' });
  }

}
