import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import {
  PrintService,
  Workspace,
  WorkspaceFlag,
  WorkspaceService,
  hasFlag,
} from "@efaps/pos-library";

import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";

@Component({
  selector: "app-order-dialog",
  templateUrl: "./order-dialog.component.html",
  styleUrls: ["./order-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIcon,
  ],
})
export class OrderDialogComponent implements OnInit {
  private workspaceService = inject(WorkspaceService);
  private printService = inject(PrintService);
  private dialog = inject(MatDialog);
  dialogRef = inject<MatDialogRef<OrderDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  private workspace: Workspace | undefined = undefined;

  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe((workspace) => {
      this.workspace = workspace;
    });
  }

  printJobs() {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      data: this.printService.printJobs(this.workspace!!.oid, this.data.order)
    });
  }

  allowPayment() : boolean {
    return this.workspace != undefined && this.workspace?.docTypes && this.workspace?.docTypes.length > 0
    && this.data.order.crossTotal > 0;
  }

  allowPrintJobs() : boolean{
    return this.workspace != undefined && this.workspace?.printCmds.some((x) => x.target === "JOB") &&
        !hasFlag(this.workspace.flags, WorkspaceFlag.jobOnPayment);
  }
}
