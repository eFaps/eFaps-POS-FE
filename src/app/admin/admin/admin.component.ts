import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Versions } from '../../model/versions';
import { AdminService } from '../../services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  busy: Subscription;
  versions: Versions;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.version().subscribe(versions => this.versions = versions);
  }

  reload() {
    this.busy = this.adminService.reload().subscribe();
  }
}
