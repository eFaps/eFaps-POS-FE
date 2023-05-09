import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-print-dialog",
  templateUrl: "./print-dialog.component.html",
  styleUrls: ["./print-dialog.component.scss"],
})
export class PrintDialogComponent implements OnInit {
  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
