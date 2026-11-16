import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { Contact } from "@efaps/pos-library";
import { ContactComponent } from "@shared/contact/contact.component";

@Component({
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatButton,
    ContactComponent
  ],
  selector: "app-assign-contact-dialog",
  styleUrl: "./assign-contact-dialog.component.scss",
  templateUrl: "./assign-contact-dialog.component.html",
})
export class AssignContactDialogComponent {


  submit() {

  }

  selectContact(contact: Contact) {
    console.log(contact)
  }
}
