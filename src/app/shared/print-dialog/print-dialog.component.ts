import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";

import { PrintDisplayComponent } from "../print-display/print-display.component";

@Component({
  selector: "app-print-dialog",
  templateUrl: "./print-dialog.component.html",
  styleUrls: ["./print-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CdkScrollable, MatDialogContent, PrintDisplayComponent],
})
export class PrintDialogComponent {
  dialogRef = inject<MatDialogRef<PrintDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;
}
