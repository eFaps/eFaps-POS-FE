import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  warehouses = [];

  constructor() { }

  ngOnInit() {
    this.warehouses.push('demo');
  }
}
