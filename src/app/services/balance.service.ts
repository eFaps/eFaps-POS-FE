import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Balance } from '../model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getCurrent(_createNew?: boolean) {
    const requestUrl = `${this.config.baseUrl}/balance`;
    const params = new HttpParams()
        .set('createNew', _createNew.toString());
    return this.http.get<Balance>(requestUrl, { params: params });
  }
}
