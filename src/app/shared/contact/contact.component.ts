import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  output,
  signal,
} from "@angular/core";
import { ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatOption,
} from "@angular/material/autocomplete";

import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { Contact, ContactService } from "@efaps/pos-library";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatOption,
    MatSlideToggle,
  ],
})
export class ContactComponent implements OnInit {
  private contactService = inject(ContactService);
  private changeDetectorRefs = inject(ChangeDetectorRef);
  searchResult = signal<Contact[]>([]);

  searchControl: UntypedFormControl = new UntypedFormControl();

  nameSearch = false;
  readonly contactSelected = output<Contact>();
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((data) => {
        this.contactService
          .searchContacts(data, this.nameSearch)
          .subscribe((response) => {
            this.searchResult.set(response);
          });
      });
  }

  @Input()
  set contact(contact: Contact | undefined) {
    if (contact) {
      this.searchResult.set([contact]);
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
