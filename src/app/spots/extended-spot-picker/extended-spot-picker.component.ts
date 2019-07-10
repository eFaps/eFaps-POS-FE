import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';

import { Spot, SpotsLayout } from '../../model';
import { DocumentService, PosService, SpotService } from '../../services';
import { AbstractSpotPicker } from '../abstract-spot-picker';

@Component({
  selector: 'app-extended-spot-picker',
  templateUrl: './extended-spot-picker.component.html',
  styleUrls: ['./extended-spot-picker.component.scss']
})
export class ExtendedSpotPickerComponent extends AbstractSpotPicker implements OnInit, AfterViewInit {
  spotsLayout: SpotsLayout;
  editMode = false;
  sidenav = false;

  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    private spotService: SpotService,
    private elRef: ElementRef) {
    super(router, posService, documentService);
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

  onResized(_event: ResizedEvent) {
    this.sidenav = this.elRef.nativeElement.getBoundingClientRect().x > 50;
  }

  ngAfterViewInit(): void {
    this.sidenav = this.elRef.nativeElement.getBoundingClientRect().x > 50;
  }
}
