import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { SpotConfig, WorkspaceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-spots",
  templateUrl: "./spots.component.html",
  styleUrls: ["./spots.component.scss"],
  standalone: false,
})
export class SpotsComponent implements OnInit, OnDestroy {
  private workspaceService = inject(WorkspaceService);

  spotConfig = SpotConfig.NONE;
  private subscription$ = new Subscription();

  ngOnInit() {
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => (this.spotConfig = workspace.spotConfig),
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
