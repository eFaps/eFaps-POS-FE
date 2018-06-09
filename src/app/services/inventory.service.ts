import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InventoryEntry, Warehouse } from '../model/index';
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


  public getInventory(_warehouseOid: string): Observable<InventoryEntry[]> {
    const requestUrl = `${this.config.baseUrl}/inventory/${_warehouseOid}`;
    return this.http.get<InventoryEntry[]>(requestUrl);
  }
}