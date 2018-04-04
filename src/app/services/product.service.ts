import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService, ConfigService } from './index';




@Injectable()
export class ProductService {

    constructor(private http: HttpClient, private config: ConfigService, private auth: AuthService) {
    }

    public getProducts(): Observable<Product[]> {
       const href = this.config.baseUrl + '/products';
       const requestUrl = `${href}`;
       const httpOptions = {
         headers: new HttpHeaders({
           'Authorization': 'Bearer ' + this.auth.token
         })
       };
       return this.http.get<Product[]>(requestUrl, httpOptions);
    }

}

export interface Product {
  oid: string;
  sku: string;
  description: string;
}
