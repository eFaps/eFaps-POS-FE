import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
  public baseUrl: string;
  public socketUrl: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  load(): Promise<any> {
    return new Promise((resolve) => {
      if (environment.electron) {
        const baseUrl = this.localStorageService.get("baseUrl");
        if (baseUrl) {
          this.baseUrl = baseUrl;
        } else {
          console.log('No baseUrl')
        }
        const socketUrl = this.localStorageService.get("socketUrl");
        if (socketUrl) {
          this.socketUrl = socketUrl;
        } else {
          console.log('No socketUrl')
        }
        resolve(true);
      } else {
        this.http.get('assets/config.json')
          .subscribe((envResponse: any) => {
            this.baseUrl = envResponse.baseUrl;
            this.socketUrl = envResponse.socketUrl;
            resolve(true);
          });
      }
    });
  }
}
