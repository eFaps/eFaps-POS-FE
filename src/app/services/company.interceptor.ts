import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyInterceptor implements HttpInterceptor {

  constructor(private companyService: CompanyService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentCompany = this.companyService.currentCompany;
    if (currentCompany && currentCompany.key) {
      request = request.clone({
        setHeaders: {
          "X-CONTEXT-COMPANY": currentCompany.key
        }
      });
    }
    return next.handle(request);
  }
}
