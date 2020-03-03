import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PrintService } from "@efaps/pos-library";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./success-dialog.component.html",
  styleUrls: ["./success-dialog.component.scss"]
})
export class SuccessDialogComponent implements OnInit {
  printObservable: Observable<any> = null;

  constructor(
    private printService: PrintService,
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.print) {
      this.printObservable = this.printService.printTicket(
        this.data.workspaceOid,
        this.data.document
      );
    }
  }
}
