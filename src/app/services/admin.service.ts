import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private config: ConfigService) { }


  reload(): Observable<any> {
    const url = `${this.config.baseUrl}/admin/sync`;
    return this.http.get(url);
  }
}
