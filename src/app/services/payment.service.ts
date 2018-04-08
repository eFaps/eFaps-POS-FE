import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { Document } from '../model/index';

@Injectable()
export class PaymentService {

  private document: Document;
  private documentSource = new BehaviorSubject<Document>(this.document);
  currentDocument = this.documentSource.asObservable();

  constructor() {

  }

  changeDocument(_doc: Document) {
    this.documentSource.next(_doc);
  }
}
