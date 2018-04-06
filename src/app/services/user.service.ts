import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private config: ConfigService) {
    }
    public getUsers(): Observable<User[]> {
       const href = this.config.baseUrl + '/users';
       const requestUrl = `${href}`;
       return this.http.get<User[]>(requestUrl);
    }
}

export interface User {
  username: string;
  firstName: string;
  surName: string;
}
