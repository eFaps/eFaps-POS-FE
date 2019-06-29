import { Injectable } from '@angular/core';
import { Spot, Order, SpotsLayout } from '../model/index';
import { Observable } from 'rxjs';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private documentService: DocumentService,
    private workspaceService: WorkspaceService) { }

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

  public getLayout(): Observable<SpotsLayout> {

    let layout: SpotsLayout = {
      floors: [
        {
          label: '1st Floor',
          spots: [
            {
              id: '1',
              label: 'Mesa 1'
            },
            {
              id: '2',
              label: 'Mesa 2'
            },
            {
              id: '3',
              label: 'Mesa 3'
            }
          ]
        }
      ]
    }

    return new Observable((observer) => {
      this.documentService.getOrders4Spots().subscribe(_orders => {
        layout.floors.forEach(floor => {
          floor.spots.forEach(spot => {
            const order = _orders.find(o => o.spot && o.spot.id === spot.id);
            spot.order = order;
          })
        });
        observer.next(layout);
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
