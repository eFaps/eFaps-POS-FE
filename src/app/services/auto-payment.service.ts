import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SynerCashService } from 'synercash';

@Injectable({
  providedIn: 'root'
})
export class AutoPaymentService {
  constructor(private synerCashService: SynerCashService) { }

  public collect(_amount: number): Observable<number> {
    return this.synerCashService.sale(_amount * 100)
      .pipe(map(() => _amount));
  }
}
