import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { KeypadComponent } from "../../shared/keypad/keypad.component";

@Component({
  selector: "app-split-dialog",
  templateUrl: "./split-dialog.component.html",
  styleUrls: ["./split-dialog.component.scss"],
  imports: [
    CdkScrollable,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    KeypadComponent,
    MatDialogActions,
    MatButton,
  ],
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
