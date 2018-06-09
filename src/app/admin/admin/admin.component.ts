import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/index';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  versions = {
    FE: environment.version,
    BE: ''
  };

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.version().subscribe(_version => this.versions.BE = _version);
  }

  reload() {
    this.adminService.reload().subscribe();
  }
}
