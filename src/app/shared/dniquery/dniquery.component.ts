import { Component, EventEmitter, Output, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DNI, EnquiryService } from "@efaps/pos-library";

@Component({
  selector: "app-dniquery",
  templateUrl: "./dniquery.component.html",
  styleUrl: "./dniquery.component.scss",
  standalone: false,
})
export class DNIQueryComponent {
  private fb = inject(NonNullableFormBuilder);
  private enquiryService = inject(EnquiryService);
  private snackBar = inject(MatSnackBar);

  dniForm: FormGroup;
  @Output()
  result: EventEmitter<DNI> = new EventEmitter<DNI>();

  constructor() {
    this.dniForm = this.fb.group({
      number: ["", [Validators.required, Validators.pattern("[0-9]{8}")]],
    });
  }

  query() {
    this.enquiryService.getDNI(this.dniForm.value.number).subscribe({
      next: (dni) => {
        if (dni) {
          this.result.next(dni);
        } else {
          this.snackBar.open("no hay resultados");
        }
      },
    });
  }
}
