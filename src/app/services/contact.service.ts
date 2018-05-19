import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../model/index';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getContacts(): Observable<Contact[]> {
    const href = this.config.baseUrl + '/contacts';
    const requestUrl = `${href}`;
    return this.http.get<Contact[]>(requestUrl);
  }

  public searchContacts(_term: string, _nameSearch: boolean): Observable<Contact[]> {
    const href = this.config.baseUrl + '/contacts';
    const requestUrl = `${href}`;
    const params = new HttpParams().set('term', _term)
        .set('nameSearch', _nameSearch.toString());
    return this.http.get<Contact[]>(requestUrl, { params: params });
  }

  public createContact(_contact: Contact): Observable<Contact> {
    const href = this.config.baseUrl + '/contacts';
    const requestUrl = `${href}`;
    return this.http.post<Contact>(requestUrl, _contact);
  }
}
