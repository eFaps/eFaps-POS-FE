import { Injectable } from '@angular/core';
import { Spot, Order } from '../model/index';
import { Observable } from 'rxjs/Observable';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private documentService: DocumentService,
    private workspaceService: WorkspaceService ) { }

  public getSpots(): Observable<Spot[]> {
    return new Observable((observer) => {
      this.documentService.getOrders4Spots().subscribe(_orders => {
        const spots: Spot[] = [];
        for (let i = 0; i < this.workspaceService.getSpotSize(); i++) {
          const order = _orders.find(o => o.spot && o.spot.id === ('' + i));
          spots.push({ id: '' + i, label: 'M ' + (i + 1), order: order });
        }
        observer.next(spots);
        observer.complete();
      });
    });
  }

  public swap(_origin: Spot, _target: Spot): Observable<Order> {
    const order = _origin.order;
    order.spot = { id: _target.id, label: _target.label };
    return this.documentService.updateOrder(order);
  }
}
