import { Injectable } from '@angular/core';
import { Spot, Order } from '../model/index';
import { Observable } from 'rxjs/Observable';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private documentService: DocumentService) { }

  public getSpots(): Observable<Spot[]> {
    return new Observable((observer) => {
      this.documentService.getOrders4Spots().subscribe(_orders => {
        const spots: Spot[] = [];
        for (let i = 0; i < 20; i++) {
          const order = _orders.find(o => o.spot && o.spot.id === ('' + i));
          spots.push({ id: '' + i, label: 'M ' + (i + 1), order: order });
        }
        observer.next(spots);
        observer.complete();
      });
    });
  }
}
