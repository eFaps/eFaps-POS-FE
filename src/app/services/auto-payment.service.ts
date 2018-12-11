import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoPaymentService {
  constructor() { }

  public collect(_amount: number): Observable<number> {
    return of(_amount).pipe(delay(5000));
  }
}
