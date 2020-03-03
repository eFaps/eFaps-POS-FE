import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpotConfig, WorkspaceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-spots",
  templateUrl: "./spots.component.html",
  styleUrls: ["./spots.component.scss"]
})
export class SpotsComponent implements OnInit, OnDestroy {
  spotConfig = SpotConfig.NONE;
  private subscription$ = new Subscription();

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit() {
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: workspace => (this.spotConfig = workspace.spotConfig)
      })
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
