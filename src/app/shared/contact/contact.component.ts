import {
  Component,
  EventEmitter,
  AfterViewInit,
  OnInit,
  Output,
  ViewChild,
  Input,
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatOption } from "@angular/material/core";
import {
  Contact,
  ContactService,
  IdentificationType,
} from "@efaps/pos-library";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, AfterViewInit {
  searchControl: UntypedFormControl = new UntypedFormControl();
  searchResult: Contact[] = [];
  nameSearch = false;
  @Output() contactSelected = new EventEmitter<Contact>();
  @Input() contact: Contact | undefined;
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;

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
    if (this.contact) {
      this.searchResult = [this.contact];
      this.contact = undefined;
    }
  }

  ngAfterViewInit(): void {
    if (this.autoComplete!!.options.length > 0) {
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
