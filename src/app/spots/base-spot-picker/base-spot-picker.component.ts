import { Component, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  DocumentService,
  PosService,
  Spot,
  SpotConfig,
  SpotService,
} from "@efaps/pos-library";

import { AbstractSpotPicker } from "../abstract-spot-picker";

@Component({
  selector: "app-base-spot-picker",
  templateUrl: "./base-spot-picker.component.html",
  styleUrls: ["./base-spot-picker.component.scss"],
  standalone: false,
})
export class BaseSpotPickerComponent
  extends AbstractSpotPicker
  implements OnInit
{
  private spotService = inject(SpotService);

  spots: Spot[] = [];

  constructor() {
    const router = inject(Router);
    const posService = inject(PosService);
    const documentService = inject(DocumentService);
    const dialog = inject(MatDialog);

    super(router, posService, documentService, dialog);
  }

  override ngOnInit() {
    this.spotService.getSpots().subscribe((_spots) => {
      this.spots = _spots;
    });
  }

  getSpotConfig(): SpotConfig {
    return SpotConfig.BASIC;
  }
}
