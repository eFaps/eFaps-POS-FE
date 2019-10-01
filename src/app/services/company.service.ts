import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Company } from '../model';
import { ConfigService } from '@efaps/pos-library';
import { LocalStorage } from 'ngx-store';

@Injectable()
export class CompanyService {
  @LocalStorage() public currentCompany: Company;

  private currentSource = new BehaviorSubject<Company>(this.currentCompany);
  company = this.currentSource.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public getCompanies(): Observable<Company[]> {
    const href = this.config.baseUrl + '/companies';
    const requestUrl = `${href}`;
    return this.http.get<Company[]>(requestUrl);
  }

  setCurrentCompany(company: Company): any {
    this.currentCompany = company;
    this.currentSource.next(company);
  }

  hasCompany(): boolean {
    return this.currentCompany != null;
  }
}
