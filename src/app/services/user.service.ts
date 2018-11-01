import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { User } from '../model/index';

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
