import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { Product } from '../model/index';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getProducts(): Observable<Product[]> {
    const href = this.config.baseUrl + '/products';
    const requestUrl = `${href}`;
    return this.http.get<Product[]>(requestUrl);
  }
}
