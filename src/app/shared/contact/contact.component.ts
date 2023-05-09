import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";

import { Contact, ContactService } from "@efaps/pos-library";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl();
  searchResult: Contact[] = [];
  nameSearch = false;
  @Output() contactSelected = new EventEmitter<Contact>();
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;

  constructor(
    private contactService: ContactService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

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

  @Input()
  set contact(contact: Contact | undefined) {
    if (contact) {
      this.searchResult = [contact];
      this.changeDetectorRefs.detectChanges();
      this.searchControl.setValue(this.autoComplete!!.options.first.value);
    }
  }

  setNameSearch() {
    this.nameSearch = !this.nameSearch;
  }

  displayFn(_contact?: Contact): string {
    return _contact ? _contact.name : "";
  }

  selectContact(_event: any) {
    this.contactSelected.emit(_event.option.value);
  }
}
