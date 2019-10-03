import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DocumentService, PosService, Spot, SpotConfig, SpotService } from '@efaps/pos-library';

import { AbstractSpotPicker } from '../abstract-spot-picker';

@Component({
  selector: 'app-base-spot-picker',
  templateUrl: './base-spot-picker.component.html',
  styleUrls: ['./base-spot-picker.component.scss']
})
export class BaseSpotPickerComponent extends AbstractSpotPicker implements OnInit {
  spots: Spot[] = [];

  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    dialog: MatDialog,
    private spotService: SpotService) {
    super(router, posService, documentService, dialog);
  }

  ngOnInit() {
    this.spotService.getSpots().subscribe(_spots => {
      this.spots = _spots;
    });
  }

  getSpotConfig(): SpotConfig {
    return SpotConfig.BASIC;
  }
}
