import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PosSyncService {
  private afterProductSelectedSource = new BehaviorSubject(
    "afterProductSelected"
  );
  afterProductSelected = this.afterProductSelectedSource.asObservable();

  constructor() {}

  productSelected() {
    this.afterProductSelectedSource.next("");
  }
}
