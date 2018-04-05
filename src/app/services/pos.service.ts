import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PosService {

  private ticket: Item[] = [];
  private ticketSource = new BehaviorSubject<Item[]>(this.ticket);
  currentTicket = this.ticketSource.asObservable();

  constructor() { }

  changeTicket(ticket: Item[]) {
    this.ticketSource.next(ticket);
  }
}


export interface Item {
  productOid: string;
  productDesc: string;
}
