import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Contact, ContactService } from "@efaps/pos-library";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl();
  searchResult = [];
  nameSearch = false;
  @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((data) => {
        this.contactService
          .searchContacts(data, this.nameSearch)
          .subscribe((response) => {
            this.searchResult = response;
          });
      });
  }

  setNameSearch() {
    this.nameSearch = !this.nameSearch;
  }

  displayFn(_contact?: Contact): string | undefined {
    return _contact ? _contact.name : undefined;
  }

  selectContact(_event) {
    this.contactSelected.emit(_event.option.value);
  }
}
