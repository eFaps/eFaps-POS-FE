import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: "app-note-dialog",
  templateUrl: "./note-dialog.component.html",
  styleUrls: ["./note-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
  ],
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
