import {
  Component,
  OnInit,
  inject,
  signal
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
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
})
export class WorkspaceComponent implements OnInit {
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);
  private posService = inject(PosService);

  currentWorkspace = this.workspaceService.current();
  workspaces = signal<Workspace[]>([]);
  poss = signal<Pos[]>([]);

  ngOnInit() {
    this.workspaceService.getWorkspaces().subscribe((data) => {
      this.workspaces.set(data);
    });
    this.posService.getPoss().subscribe((data) => {
      this.poss.set(data);
    });
  }

  select(workspace: Workspace) {
    this.workspaceService.setCurrent(workspace);
    this.router.navigate(["/pos"]);
  }

  getPosName(workspace: Workspace): string {
    const ret = this.poss().find((pos) => pos.oid === workspace.posOid);
    return ret ? ret.name : "";
  }

  isActive(ws: Workspace): boolean {

   if (this.currentWorkspace) {
    return this.currentWorkspace.oid == ws.oid
   }
   return false

  }
}
