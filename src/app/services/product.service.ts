import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ConfigService } from './config.service';
import { Product, Category, PosCategory } from '../model/index';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getProducts(): Observable<Product[]> {
    const href = this.config.baseUrl + '/products';
    const requestUrl = `${href}`;
    return this.http.get<Product[]>(requestUrl);
  }

  public getPosCategories(): Observable<PosCategory[]> {
    return forkJoin([
      this.getCategories(),
      this.getProducts()
    ]).pipe(
      map((data: any[]) => {
        const categories: Category[] = data[0];
        const products: Product[] = data[1];
        const posCategories: PosCategory[] = [];
        categories.forEach(_category => {
            posCategories.push({
                oid: _category.oid,
                name: _category.name,
                products: products.filter(_product => _product.categoryOids.includes(_category.oid))
            });
        });
        return posCategories;
      }));
  }

  public getCategories(): Observable<Category[]> {
    const href = this.config.baseUrl + '/categories';
    const requestUrl = `${href}`;
    return this.http.get<Category[]>(requestUrl);
  }

}
