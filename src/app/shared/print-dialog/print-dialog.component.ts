import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent } from "@angular/material/dialog";
import { PrintDisplayComponent } from "../print-display/print-display.component";

@Component({
  selector: "app-print-dialog",
  templateUrl: "./print-dialog.component.html",
  styleUrls: ["./print-dialog.component.scss"],
  imports: [CdkScrollable, MatDialogContent, PrintDisplayComponent],
})
export class PrintDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  ngOnInit() {}
}
