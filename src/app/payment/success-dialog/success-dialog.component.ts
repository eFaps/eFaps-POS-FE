import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { PrintService, PosLibraryModule } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { PrintDisplayComponent } from "../../shared/print-display/print-display.component";
import { MatButton } from "@angular/material/button";

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
