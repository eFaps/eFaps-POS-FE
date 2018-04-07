import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { DocumentService } from './document.service';
import { WorkspaceService } from './workspace.service';
import { Item, Pos, Product } from '../model/index';

@Injectable()
export class PosService {

  private ticket: Item[] = [];
  private ticketSource = new BehaviorSubject<Item[]>(this.ticket);
  currentTicket = this.ticketSource.asObservable();

  private netTotal = 0;
  private netTotalSource = new BehaviorSubject<number>(this.netTotal);
  currentNetTotal = this.netTotalSource.asObservable();

  private crossTotal = 0;
  private crossTotalSource = new BehaviorSubject<number>(this.crossTotal);
  currentCrossTotal = this.crossTotalSource.asObservable();

  private currentPos: Pos;

  constructor(private http: HttpClient, private config: ConfigService,
    private workspaceService: WorkspaceService,
    private documentService: DocumentService) {

    this.workspaceService.currentWorkspace.subscribe(_data => {
      if (_data) {
        if (!(this.currentPos && this.currentPos.oid === _data.posOid)) {
          this.getPos(_data.posOid)
            .subscribe(_pos => this.currentPos = _pos);
          this.changeTicket([]);
        }
      }
    });
  }

  public getPos(_oid: string): Observable<Pos> {
    const url = `${this.config.baseUrl}/poss/${_oid}`;
    return this.http.get<Pos>(url);
  }

  changeTicket(_ticket: Item[]) {
    this.calculateItems(_ticket);
    this.calculateTotals(_ticket);
    this.ticketSource.next(_ticket);
  }

  calculateItems(_ticket: Item[]) {
    _ticket.forEach(function(_item: Item) {
      _item.price = (_item.product.crossPrice * _item.quantity);
    });
  }

  calculateTotals(_ticket: Item[]) {
    let net = 0;
    let cross = 0;
    _ticket.forEach(function(_item: Item) {
      net += _item.price;
      cross += _item.price;
    });
    this.netTotalSource.next(cross);
    this.crossTotalSource.next(cross);
  }

  register() {
    this.documentService.createReceipt({
        oid: null,
        number: null
    }).subscribe();
  }
}
