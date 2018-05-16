import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactService } from '../../services/index';

import { Contact } from '../../model/index';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

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
}
