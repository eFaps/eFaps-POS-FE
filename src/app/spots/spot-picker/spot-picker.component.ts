import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Spot, DocStatus, Document } from '../../model/index';
import { DocumentService, PosService, SpotService, WorkspaceService } from '../../services/index';

@Component({
  selector: 'app-spot-picker',
  templateUrl: './spot-picker.component.html',
  styleUrls: ['./spot-picker.component.scss']
})
export class SpotPickerComponent implements OnInit {
  spots: Spot[] = [];

  constructor(private router: Router,
    private posService: PosService,
    private documentService: DocumentService,
    private workspaceService: WorkspaceService,
    private spotService: SpotService) { }

  ngOnInit() {
    this.spotService.getSpots().subscribe(_spots => {
      this.spots = _spots;
    });
  }

  selectSpot(_spot: Spot) {
    if (_spot.order) {
      this.posService.changeOrder(_spot.order);
      this.router.navigate(['/pos']);
    } else {
      const order = {
        id: null,
        oid: null,
        number: null,
        currency: this.posService.currency,
        items: [],
        status: DocStatus.OPEN,
        netTotal: 0,
        crossTotal: 0,
        taxes: [],
        spot: _spot
      };
      this.documentService.createOrder(order).subscribe(_order => {
        this.posService.changeOrder(_order);
        this.router.navigate(['/pos']);
      });
    }
  }
}
