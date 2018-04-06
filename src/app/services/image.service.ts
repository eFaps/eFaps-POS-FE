import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient, private config: ConfigService,
    private domSanitizer: DomSanitizer) { }

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
