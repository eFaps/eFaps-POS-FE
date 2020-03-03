import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { WorkspaceRoutingModule } from "./workspace-routing.module";
import { WorkspaceComponent } from "./workspace.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  imports: [CommonModule, WorkspaceRoutingModule, MaterialModule],
  declarations: [WorkspaceComponent]
})
export class WorkspaceModule {}
