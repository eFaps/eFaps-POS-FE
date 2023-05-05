import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";

import { WorkspaceRoutingModule } from "./workspace-routing.module";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
  imports: [CommonModule, WorkspaceRoutingModule, MatCardModule],
  declarations: [WorkspaceComponent],
})
export class WorkspaceModule {}
