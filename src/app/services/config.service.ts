import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  public baseUrl: string;
  constructor(private http: HttpClient) {

  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config.json')
        .subscribe((envResponse: any) => {
          this.baseUrl = envResponse.baseUrl;
          resolve(true);
        });
    });

  }
}
