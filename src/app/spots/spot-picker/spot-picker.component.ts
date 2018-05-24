import { Component, OnInit } from '@angular/core';
import { Spot } from '../../model/index';
import { WorkspaceService, SpotService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spot-picker',
  templateUrl: './spot-picker.component.html',
  styleUrls: ['./spot-picker.component.scss']
})
export class SpotPickerComponent implements OnInit {
  spots: Spot[];

  constructor(private router: Router,
      private workspaceService: WorkspaceService,
      private spotService: SpotService) { }

  ngOnInit() {
    this.spots = [];
    for (let i = 0; i < 20; i++) {
      this.spots.push({ name: '' + (i + 1) });
    }
  }

  selectSpot(_spot: Spot) {
    console.log(_spot);
    this.router.navigate(['/pos']);
  }
}
