import { Component, OnInit } from "@angular/core";
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { Contact } from "@efaps/pos-library";
import { CreateContactDialogComponent } from "src/app/contacts/create-contact-dialog/create-contact-dialog.component";

@Component({
  selector: "app-contact-dialog",
  templateUrl: "./contact-dialog.component.html",
  styleUrls: ["./contact-dialog.component.scss"],
})
export class ContactDialogComponent implements OnInit {
  contact: Contact | null = null;
  constructor(
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    private dialog: MatDialog
  ) {}

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
}
