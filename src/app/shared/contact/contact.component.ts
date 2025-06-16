import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from "@angular/core";
import { UntypedFormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";

import { Contact, ContactService } from "@efaps/pos-library";
import { debounceTime } from "rxjs/operators";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        MatAutocompleteTrigger,
        ReactiveFormsModule,
        MatAutocomplete,
        MatOption,
        MatSlideToggle,
    ],
})
export class ContactComponent implements OnInit {
  private contactService = inject(ContactService);
  private changeDetectorRefs = inject(ChangeDetectorRef);

  searchControl: UntypedFormControl = new UntypedFormControl();
  searchResult: Contact[] = [];
  nameSearch = false;
  @Output() contactSelected = new EventEmitter<Contact>();
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete | undefined;

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
