import { Component, OnInit } from '@angular/core';

import { PosService } from '../../services/index';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

  net: number;
  cross: number;
  constructor(private posService: PosService) { }

  ngOnInit() {
      this.posService.currentNetTotal.subscribe(_data => this.net = _data);
      this.posService.currentCrossTotal.subscribe(_data => this.cross = _data);
  }

}
