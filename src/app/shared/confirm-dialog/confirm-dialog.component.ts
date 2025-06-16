import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-confirm-dialog",
    templateUrl: "./confirm-dialog.component.html",
    imports: [
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class ConfirmDialogComponent {
  dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
}
