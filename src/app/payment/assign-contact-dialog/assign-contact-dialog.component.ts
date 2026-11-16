import { Component, inject, viewChild } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { Contact } from "@efaps/pos-library";

import { ContactComponent } from "@shared/contact/contact.component";
import { CreateContactComponent } from "@shared/create-contact/create-contact.component";
@Component({
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatButton,
    ContactComponent,
    CreateContactComponent,
    MatExpansionPanel,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
  ],
  selector: "app-assign-contact-dialog",
  styleUrl: "./assign-contact-dialog.component.scss",
  templateUrl: "./assign-contact-dialog.component.html",
})
export class AssignContactDialogComponent {
  private dialogRef =
    inject<MatDialogRef<AssignContactDialogComponent>>(MatDialogRef);
  private createContactComp = viewChild(CreateContactComponent);
  private openPanelKey: string = "existing";

  private contact: Contact | undefined;

  submit() {
    if (this.openPanelKey == "new") {
      this.createContactComp()!.submit();
    } else {
      this.dialogRef.close(this.contact);
    }
  }

  selectContact(contact: Contact) {
    this.contact = contact;
  }

  contactCreated(contact: Contact) {
    if (contact) {
      this.dialogRef.close(contact);
    }
  }

  panelOpened(key: string) {
    this.openPanelKey = key;
  }

  valid(): boolean {
    if (this.openPanelKey == "existing") {
      return true;
    }
    return this.createContactComp()?.contactForm.valid!;
  }
}
