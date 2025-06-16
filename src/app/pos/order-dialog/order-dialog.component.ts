import { Component, OnInit, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {
  PrintService,
  WorkspaceFlag,
  WorkspaceService,
  hasFlag,
} from "@efaps/pos-library";

import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
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

  allowPayment: boolean = false;
  allowPrintJobs: boolean = false;
  workspaceOid!: string;

  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe((workspace) => {
      this.allowPayment = workspace.docTypes && workspace.docTypes.length > 0;
      this.allowPrintJobs =
        workspace.printCmds.some((x) => x.target === "JOB") &&
        !hasFlag(workspace.flags, WorkspaceFlag.jobOnPayment);
      this.workspaceOid = workspace.oid;
    });
  }

  printJobs() {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      data: this.printService.printJobs(this.workspaceOid, this.data.order),
    });
  }
}
