import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Spot, SpotsLayout, SpotConfig } from '../../model';
import { DocumentService, PosService, SpotService } from '../../services';
import { AbstractSpotPicker } from '../abstract-spot-picker';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-extended-spot-picker',
  templateUrl: './extended-spot-picker.component.html',
  styleUrls: ['./extended-spot-picker.component.scss']
})
export class ExtendedSpotPickerComponent extends AbstractSpotPicker implements OnInit {
  spotsLayout: SpotsLayout;
  editMode = false;
  sidenav = false;

  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    dialog: MatDialog,
    private spotService: SpotService) {
    super(router, posService, documentService, dialog);
  }

  ngOnInit() {
    this.spotService.getLayout().subscribe({
      next: layout => this.spotsLayout = layout
    });
  }

  get floors() {
    return this.spotsLayout ? this.spotsLayout.floors : [];
  }

  togglEditMode() {
    this.editMode = !this.editMode;
  }

  selectSpot(spot: Spot) {
    if (!this.editMode) {
      super.selectSpot(spot);
    }
  }

  dragEnded(event: CdkDragEnd) {
    const spot: Spot = event.source.data;
    const position = event.source.getFreeDragPosition();
    this.spotService.setPosition(spot, position);
  }

  getSpotConfig(): SpotConfig {
    return SpotConfig.EXTENDED;
  }
}
