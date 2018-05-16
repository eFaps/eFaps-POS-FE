import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Contact } from '../../model/index';
import { ContactService } from '../../services/index';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ ContactService ]
})
export class ContactComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  searchResult = [];
  nameSearch = false;
  @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
      this.searchControl.valueChanges
        .debounceTime(400)
        .subscribe(data => {
            this.contactService.searchContacts(data, this.nameSearch).subscribe(response => {
                this.searchResult = response;
            });
        });
  }

  setNameSearch() {
    this.nameSearch = ! this.nameSearch;
  }

  displayFn(_contact?: Contact): string | undefined {
    return _contact ? _contact.name : undefined;
  }

  selectContact(_event) {
    this.contactSelected.emit(_event.option.value);
  }
}
