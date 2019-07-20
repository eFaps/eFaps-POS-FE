import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs';

import { Order, Position, Spot, SpotsLayout, Workspace } from '../model';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  @LocalStorage() public positions: any = {};
  private workspace: Workspace;

  constructor(private documentService: DocumentService,
    private workspaceService: WorkspaceService) {

    workspaceService.currentWorkspace.subscribe({
      next: workspace => this.workspace = workspace
    });
  }

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
      floors: this.workspace.floors
    }

    return new Observable((observer) => {
      this.documentService.getOrders4Spots().subscribe(_orders => {
        layout.floors.forEach(floor => {
          floor.spots.forEach(spot => {
            if (spot.oid) {
              spot.id = spot.oid;
            }
            const order = _orders.find(o => o.spot && o.spot.id === spot.id);
            spot.order = order;
            spot.position = this.positions[spot.id];
          })
        });
        observer.next(layout);
        observer.complete();
      });
    });
  }

  setPosition(spot: Spot, position: Position): void {
    this.positions[spot.id] = position;
    this.positions.save();
  }

  public swap(_origin: Spot, _target: Spot): Observable<Order> {
    const order = _origin.order;
    order.spot = { id: _target.id, label: _target.label };
    return this.documentService.updateOrder(order);
  }
}
