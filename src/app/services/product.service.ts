import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient, private config: ConfigService) {
    }

    public getProducts(): Observable<Product[]> {
       const href = this.config.baseUrl + '/products';
       const requestUrl = `${href}`;
       return this.http.get<Product[]>(requestUrl);
    }

}

export interface Product {
  oid: string;
  sku: string;
  description: string;
}
