import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Indication, Product } from "@efaps/pos-library";

@Component({
  selector: "app-remark-dialog",
  templateUrl: "./remark-dialog.component.html",
  styleUrls: ["./remark-dialog.component.scss"],
})
export class RemarkDialogComponent {
  remarkForm: FormGroup;
  indications: Indication[] = [];
  visible = true;
  removable = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RemarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.remarkForm = this.fb.group({
      remark: [],
    });
  }

  close() {
    const remarks: string[] = [];
    this.indications.forEach((ind) => {
      remarks.push(ind.value);
    });
    this.matDialogRef.close(remarks.join("\n"));
  }

  remove(indication: any): void {
    const index = this.indications.indexOf(indication);

    if (index >= 0) {
      this.indications.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.addIndication(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  select(indication: Indication) {
    this.addIndication(indication.value);
  }

  private addIndication(value: string) {
    if (!this.indications.some((val) => val.value === value)) {
      this.indications.push({ oid: "", value: value });
    }
  }
}
