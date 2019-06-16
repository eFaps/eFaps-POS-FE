import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';

import { ConfigService } from './config.service';
import { Cacheable } from 'ngx-cacheable';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  @Cacheable()
  public loadImage(_oid: string): Observable<any> {
    const url = `${this.config.baseUrl}/images/${_oid}`;
    return new Observable((observer: Subscriber<any>) => {
      let objectUrl: string = null;
      this.http
        .get(url, { responseType: 'blob' })
        .subscribe(m => {
          objectUrl = URL.createObjectURL(m);
          observer.next(objectUrl);
        });
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
      };
    });
  }

}
