import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-print-dialog",
  templateUrl: "./print-dialog.component.html",
  styleUrls: ["./print-dialog.component.scss"],
  standalone: false,
})
export class PrintDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  ngOnInit() {}
}
