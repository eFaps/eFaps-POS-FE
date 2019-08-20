import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectService {
  collect(amount: number): any {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
