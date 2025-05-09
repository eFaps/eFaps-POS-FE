import { Component, OnInit, inject } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-split-dialog",
  templateUrl: "./split-dialog.component.html",
  styleUrls: ["./split-dialog.component.scss"],
  standalone: false,
})
export class SplitDialogComponent implements OnInit {
  private fb = inject(UntypedFormBuilder);
  private dialogRef = inject<MatDialogRef<SplitDialogComponent>>(MatDialogRef);

  quantityForm!: UntypedFormGroup;
  quantity: number = 0;

  ngOnInit() {
    this.quantityForm = this.fb.group({
      quantity: [""],
    });
  }

  setQuantity(_number: string) {
    let multi;
    switch (_number) {
      case "clear":
        multi = "";
        break;
      default:
        multi = "" + this.quantityForm.value.quantity + _number;
        break;
    }
    this.quantityForm.patchValue({ quantity: multi });
    this.quantity = Number(multi);
  }

  split() {
    this.dialogRef.close(this.quantity);
  }
}
