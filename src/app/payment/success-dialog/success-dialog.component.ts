import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { PosLibraryModule, PrintService } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { PrintDisplayComponent } from "../../shared/print-display/print-display.component";

@Component({
  templateUrl: "./success-dialog.component.html",
  styleUrls: ["./success-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    PrintDisplayComponent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    PosLibraryModule,
  ],
})
export class SuccessDialogComponent implements OnInit {
  private printService = inject(PrintService);
  dialogRef = inject<MatDialogRef<SuccessDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  printObservable: Observable<any> | undefined = undefined;
  printJobObservable: Observable<any> | undefined = undefined;

  ngOnInit() {
    if (this.data.print) {
      this.printObservable = this.printService.printTicket(
        this.data.workspaceOid,
        this.data.document,
      );
    }
    if (this.data.job) {
      this.printJobObservable = this.printService.printJobs(
        this.data.workspaceOid,
        this.data.order,
      );
    }
  }
}
