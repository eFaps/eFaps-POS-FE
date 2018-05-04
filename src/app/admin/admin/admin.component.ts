import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  reload() {
    this.adminService.reload().subscribe();
  }
}
