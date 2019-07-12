import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Balance } from '../model';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balance: Balance;
  private balanceSource = new BehaviorSubject<Balance>(this.balance);
  currentBalance = this.balanceSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService,
    private config: ConfigService, private workspaceService: WorkspaceService) {
    this.setup();
  }

  private setup() {
    this.authService.currentEvent.subscribe(event => {
      switch (event) {
        case 'login':
          this.load();
          break;
        case 'logout':
          this.balanceSource.next(null);
      }
    });
    this.workspaceService.currentWorkspace.subscribe(ws => {
      if (ws) {
        this.load();
      } else {
        this.balanceSource.next(null);
      }
    });
  }

  private load() {
    this.getCurrent(false).subscribe({
      next: balance => {
        this.balanceSource.next(balance);
      },
      error: error => {
        if (error.status !== 404) {
          console.log(error);
        }
      }
    });
  }

  private getCurrent(_createNew?: boolean) {
    const requestUrl = `${this.config.baseUrl}/balance`;
    const params = new HttpParams()
      .set('createNew', _createNew.toString());
    return this.http.get<Balance>(requestUrl, { params: params });
  }

  init() {
    this.getCurrent(true).subscribe(_balance => this.balanceSource.next(_balance));
  }

  close(_balance: Balance) {
    const url = `${this.config.baseUrl}/balance/${_balance.id}`;
    this.http.put<Balance>(url, _balance).subscribe();
    this.balanceSource.next(null);
  }
}
