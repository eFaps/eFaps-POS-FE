import { Component, OnInit, inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Contact } from "@efaps/pos-library";
import { CreateContactDialogComponent } from "src/app/contacts/create-contact-dialog/create-contact-dialog.component";

@Component({
  selector: "app-contact-dialog",
  templateUrl: "./contact-dialog.component.html",
  styleUrls: ["./contact-dialog.component.scss"],
  standalone: false,
})
export class ContactDialogComponent implements OnInit {
  private dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);
  private dialog = inject(MatDialog);

  contact: Contact | null = null;

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
