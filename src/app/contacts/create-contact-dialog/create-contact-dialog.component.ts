import {
  Component,
  inject,
  ChangeDetectionStrategy,
  viewChild,
} from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Contact } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";

import { CreateContactComponent } from "@shared/create-contact/create-contact.component";

@Component({
  selector: "app-create-contact-dialog",
  templateUrl: "./create-contact-dialog.component.html",
  styleUrls: ["./create-contact-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    CreateContactComponent,
    TranslatePipe,
  ],
})
export class CreateContactDialogComponent {
  dialogRef = inject<MatDialogRef<CreateContactDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  private createContactComp = viewChild(CreateContactComponent);

  valid(): boolean {
    return this.createContactComp()?.contactForm.valid!;
  }

  submit() {
    this.createContactComp()!.submit();
  }
  contactCreated(contact: Contact) {
    if (contact) {
      this.dialogRef.close();
    }
  }
}
