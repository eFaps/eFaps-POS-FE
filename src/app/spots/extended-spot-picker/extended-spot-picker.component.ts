import { Component, OnInit } from '@angular/core';
import { SpotsLayout, Spot } from '../../model';
import { AbstractSpotPicker } from '../abstract-spot-picker';
import { Router } from '@angular/router';
import { PosService, DocumentService, SpotService } from '../../services';

@Component({
  selector: 'app-extended-spot-picker',
  templateUrl: './extended-spot-picker.component.html',
  styleUrls: ['./extended-spot-picker.component.scss']
})
export class ExtendedSpotPickerComponent extends AbstractSpotPicker implements OnInit {
  spotsLayout: SpotsLayout;
  editMode = false;

  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    private spotService: SpotService) {
    super(router, posService, documentService);
  }

  ngOnInit() {
    this.spotService.getLayout().subscribe({
      next: layout => this.spotsLayout = layout
    });
  }

  get floors() {
    return this.spotsLayout.floors;
  }

  togglEditMode() {
    this.editMode = !this.editMode;
  }

  selectSpot(spot: Spot) {
    if (!this.editMode) {
      super.selectSpot(spot);
    }
  }
}
