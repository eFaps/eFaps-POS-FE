import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { SpotConfig, WorkspaceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

import { BaseSpotPickerComponent } from "../base-spot-picker/base-spot-picker.component";
import { ExtendedSpotPickerComponent } from "../extended-spot-picker/extended-spot-picker.component";

@Component({
  selector: "app-spots",
  templateUrl: "./spots.component.html",
  styleUrls: ["./spots.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BaseSpotPickerComponent, ExtendedSpotPickerComponent],
})
export class SpotsComponent implements OnInit, OnDestroy {
  private workspaceService = inject(WorkspaceService);

  spotConfig = SpotConfig.NONE;
  private subscription$ = new Subscription();

  ngOnInit() {
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => {
          if (workspace && workspace.spotConfig) {
            this.spotConfig = workspace.spotConfig;
          } else {
            this.spotConfig = SpotConfig.NONE;
          }
        },
      }),
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  isBasic() {
    return this.spotConfig == SpotConfig.BASIC;
  }

  isExtended() {
    return this.spotConfig == SpotConfig.EXTENDED;
  }
}
