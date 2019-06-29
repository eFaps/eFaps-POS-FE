import { Component, OnInit } from '@angular/core';
import { SpotsLayout } from '../../model';

@Component({
  selector: 'app-extended-spot-picker',
  templateUrl: './extended-spot-picker.component.html',
  styleUrls: ['./extended-spot-picker.component.scss']
})
export class ExtendedSpotPickerComponent implements OnInit {
  spotsLayout: SpotsLayout;
  editMode = false;

  constructor() { }

  ngOnInit() {
    this.spotsLayout = {
      floors: [
        {
          label: '1st Floor',
          spots: [
            {
              id: '1',
              label: 'Mesa 1'
            },
            {
              id: '2',
              label: 'Mesa 2'
            },
            {
              id: '3',
              label: 'Mesa 3'
            }
          ]
        }
      ]
    }
  }

  get floors() {
    return this.spotsLayout.floors;
  }

  togglEditMode() {
    this.editMode = !this.editMode;
  }
}
