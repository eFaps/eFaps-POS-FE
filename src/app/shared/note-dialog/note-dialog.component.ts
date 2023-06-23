import { Component, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-note-dialog",
  templateUrl: "./note-dialog.component.html",
  styleUrls: ["./note-dialog.component.scss"],
})
export class NoteDialogComponent {
  noteCtrl: FormControl<string | null>;

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | undefined
  ) {
    this.noteCtrl = new FormControl<string | null>(null);
    if (data) {
      this.noteCtrl.patchValue(data);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.noteCtrl.value ? this.noteCtrl.value : null);
  }
}
