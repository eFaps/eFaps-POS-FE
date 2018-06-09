import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Warehouse } from '../model/index';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private config: ConfigService,
    private http: HttpClient) { }


  public getWarehouses(): Observable<Warehouse[]> {
    const requestUrl = `${this.config.baseUrl}/inventory/warehouses`;
    return this.http.get<Warehouse[]>(requestUrl);
  }

}
