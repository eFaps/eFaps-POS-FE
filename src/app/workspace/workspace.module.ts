import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { WorkspaceRoutingModule } from "./workspace-routing.module";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
  imports: [CommonModule, WorkspaceRoutingModule],
  declarations: [WorkspaceComponent]
})
export class WorkspaceModule {}
