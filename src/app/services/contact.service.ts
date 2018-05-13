import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
