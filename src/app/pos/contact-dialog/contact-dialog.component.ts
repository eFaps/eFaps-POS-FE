import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { LocalStorage } from "@efaps/ngx-store";
import { Contact } from "@efaps/pos-library";
import { CreateContactDialogComponent } from "src/app/contacts/create-contact-dialog/create-contact-dialog.component";
import { ContactComponent } from "../../shared/contact/contact.component";

@Component({
  selector: "app-contact-dialog",
  templateUrl: "./contact-dialog.component.html",
  styleUrls: ["./contact-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatTabGroup,
    MatTab,
    ContactComponent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class ContactDialogComponent implements OnInit {
  private dialogRef =
    inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);
  private dialog = inject(MatDialog);
  data: { contact: boolean; shoutOut: boolean } = inject(MAT_DIALOG_DATA);

  @LocalStorage("posContactDialogSelected")
  selected = 0;
  contact: Contact | null = null;
  shoutOut: String | undefined = undefined;

  ngOnInit(): void {}

  selectContact(contact: Contact) {
    if (contact) {
      this.contact = contact;
    }
  }

  openCreateContact() {
    const ref = this.dialog.open(CreateContactDialogComponent, {
      width: "450px",
    });
    ref.afterClosed().subscribe((_result) => {
      if (_result) {
        this.dialogRef.close(_result);
      }
    });
  }

  isValid(): boolean {
    return this.selected == 1 || this.contact != null;
  }

  submit() {
    if (this.contact != null) {
      this.dialogRef.close(this.contact);
    } else {
      this.dialogRef.close(this.shoutOut);
    }
  }

  selectedChanged() {
    if (this.selected == 1) {
      this.contact = null;
    }
  }
}
