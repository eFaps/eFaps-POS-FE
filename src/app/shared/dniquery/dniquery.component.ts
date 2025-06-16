import { Component, inject, output } from "@angular/core";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DNI, EnquiryService } from "@efaps/pos-library";

@Component({
  selector: "app-dniquery",
  templateUrl: "./dniquery.component.html",
  styleUrl: "./dniquery.component.scss",
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButton],
})
export class DNIQueryComponent {
  private fb = inject(NonNullableFormBuilder);
  private enquiryService = inject(EnquiryService);
  private snackBar = inject(MatSnackBar);

  dniForm: FormGroup;
  readonly result = output<DNI>();

  constructor() {
    this.dniForm = this.fb.group({
      number: ["", [Validators.required, Validators.pattern("[0-9]{8}")]],
    });
  }

  query() {
    this.enquiryService.getDNI(this.dniForm.value.number).subscribe({
      next: (dni) => {
        if (dni) {
          this.result.emit(dni);
        } else {
          this.snackBar.open("no hay resultados");
        }
      },
    });
  }
}
