import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { PrintService, WorkspaceService } from "@efaps/pos-library";

import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";

@Component({
  selector: "app-order-dialog",
  templateUrl: "./order-dialog.component.html",
  styleUrls: ["./order-dialog.component.scss"]
})
export class OrderDialogComponent implements OnInit {
  allowPayment: boolean;
  allowPrintJobs: boolean;
  workspaceOid: string;

  constructor(
    private workspaceService: WorkspaceService,
    private printService: PrintService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe(_data => {
      this.allowPayment = _data.docTypes && _data.docTypes.length > 0;
      this.allowPrintJobs = _data.printCmds.some(x => x.target === "JOB");
      this.workspaceOid = _data.oid;
    });
  }

  printJobs() {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      data: this.printService.printJobs(this.workspaceOid, this.data.order)
    });
  }
}
