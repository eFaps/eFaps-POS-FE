import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { LocalStorage } from 'ngx-store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Roles } from '../model/index';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
  @LocalStorage() public currentUser: any;

  private eventSource = new BehaviorSubject<string>('');
  currentEvent = this.eventSource.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  login(username: string, password: string): Observable<boolean> {
    const href = this.config.baseUrl + '/authenticate';
    return this.http.post(href, { userName: username, password: password })
      .pipe(map((response: any) => {
        const token = response.token;
        if (token) {
          this.currentUser = { username: username, token: token };
          this.currentUser.save();
          this.eventSource.next('login');
          return true;
        } else {
          return false;
        }
      }));

  }

  logout(): void {
    this.currentUser = null;
    this.eventSource.next('logout');
  }

  getToken(): string {
    return this.currentUser && this.currentUser.token;
  }

  getCurrentUsername(): string {
    return this.currentUser && this.currentUser.username;
  }

  getTokenExpirationDate(_token: string): Date {
    const decoded = jwtDecode(_token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(_token?: string): boolean {
    if (!_token) { _token = this.getToken(); }
    if (!_token) { return true; }

    const date = this.getTokenExpirationDate(_token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  hasRole(_role: Roles) {
    if (this.isTokenExpired()) {
        return false;
    }
    const decoded = jwtDecode(this.getToken());
    const roles: string[] = decoded.roles;
    return roles.find(x => x === Roles[_role]) ? true : false;
  }
}
