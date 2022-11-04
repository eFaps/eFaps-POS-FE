import { Component, OnInit } from "@angular/core";
import { Contact } from "@efaps/pos-library";

@Component({
  selector: "app-contact-dialog",
  templateUrl: "./contact-dialog.component.html",
  styleUrls: ["./contact-dialog.component.scss"],
})
export class ContactDialogComponent implements OnInit {
  contact: Contact | null = null;
  constructor() {}

  ngOnInit(): void {}

  selectContact(contact: Contact) {
    if (contact) {
      this.contact = contact;
    }
  }
}
