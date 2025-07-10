import { Component, OnInit, inject } from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import {
  DocumentService,
  PosService,
  Spot,
  SpotConfig,
  SpotService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";

import { AbstractSpotPicker } from "../abstract-spot-picker";

@Component({
  selector: "app-base-spot-picker",
  templateUrl: "./base-spot-picker.component.html",
  styleUrls: ["./base-spot-picker.component.scss"],
  imports: [MatFabButton, MatTooltip, MatIcon, TranslatePipe],
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
