import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
  public token: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }


  login(username: string, password: string): Observable<boolean> {
    const href = this.config.baseUrl + '/authenticate';

    return this.http.post(href, JSON.stringify({ username: username, password: password }))
      .pipe(map((response: any) => {
        const token = response.token;
        if (token) {
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      }));

  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
