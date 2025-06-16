import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { PrintService } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { SharedModule } from "../../shared/shared.module";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-success-dialog",
    templateUrl: "./success-dialog.component.html",
    styleUrls: ["./success-dialog.component.scss"],
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        SharedModule,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class SuccessDialogComponent implements OnInit {
  private printService = inject(PrintService);
  dialogRef = inject<MatDialogRef<SuccessDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  printObservable: Observable<any> | undefined = undefined;

  ngOnInit() {
    if (this.data.print) {
      this.printObservable = this.printService.printTicket(
        this.data.workspaceOid,
        this.data.document,
      );
    }
  }
}
