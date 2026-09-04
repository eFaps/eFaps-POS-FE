import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { Router } from "@angular/router";

import {
  Pos,
  PosService,
  Workspace,
  WorkspaceService,
} from "@efaps/pos-library";

@Component({
  selector: "app-workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
})
export class WorkspaceComponent implements OnInit {
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);
  private posService = inject(PosService);

  workspaces: Workspace[] = [];
  poss: Pos[] = [];

  ngOnInit() {
    this.workspaceService.getWorkspaces().subscribe((data) => {
      this.workspaces = data;
    });
    this.posService.getPoss().subscribe((data) => {
      this.poss = data;
    });
  }

  select(_workspace: Workspace) {
    this.workspaceService.setCurrent(_workspace);
    this.router.navigate(["/pos"]);
  }

  getPosName(_workspace: Workspace): string {
    const ret = this.poss.find((pos) => pos.oid === _workspace.posOid);
    return ret ? ret.name : "";
  }
}
