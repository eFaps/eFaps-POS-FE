import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-note-dialog",
  templateUrl: "./note-dialog.component.html",
  styleUrls: ["./note-dialog.component.scss"],
  standalone: false,
})
export class NoteDialogComponent {
  dialogRef = inject<MatDialogRef<NoteDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  noteCtrl: FormControl<string | null>;

  constructor() {
    const data = this.data;

    this.noteCtrl = new FormControl<string | null>(null);
    if (data) {
      this.noteCtrl.patchValue(data);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.noteCtrl.value ? this.noteCtrl.value : null);
  }
}
