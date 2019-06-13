import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Company } from '../model';
import { ConfigService } from './config.service';

@Injectable()
export class CompanyService {

  private current: Company = null;
  private currentSource = new BehaviorSubject<Company>(this.current);
  currentCompany = this.currentSource.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public getCompanies(): Observable<Company[]> {
    const href = this.config.baseUrl + '/companies';
    const requestUrl = `${href}`;
    return this.http.get<Company[]>(requestUrl);
  }

  setCurrentCompany(company: Company): any {
    this.current = company;
    this.currentSource.next(company);
  }

  hasCompany(): boolean {
    return this.current != null;
  }
}
