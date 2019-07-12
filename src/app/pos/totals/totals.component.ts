import { Component, OnInit } from '@angular/core';

import { PosService } from '../../services/index';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

  net: number;
  taxesEntries: [string, number][];
  cross: number;
  currentCurrency: string;

  constructor(private posService: PosService) { }

  ngOnInit() {
    this.posService.currentCurrency.subscribe(_data => this.currentCurrency = _data);
    this.posService.currentNetTotal.subscribe(_data => this.net = _data);
    this.posService.currentTaxes.subscribe(_data => {
      this.taxesEntries = Array.from(_data.entries());
    });
    this.posService.currentCrossTotal.subscribe(_data => this.cross = _data);
  }
}
