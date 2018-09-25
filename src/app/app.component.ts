import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Roles } from './model/index';
import { AuthService, WorkspaceService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  Roles = Roles;
  title = 'app';
  screenWidth: number;
  workspace: string;
  spots = false;
  inventory = false;
  allowPayment = false;

  constructor(public router: Router, private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private workspaceService: WorkspaceService,
    public auth: AuthService) {
    translate.use(workspaceService.getLanguage());
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe(_data => {
      if (_data) {
        this.workspace = _data.name;
        this.spots = this.workspaceService.showSpots();
        this.inventory = this.workspaceService.showInventory();
        this.allowPayment = _data.docTypes && _data.docTypes.length > 0;
      } else {
        this.workspace = '';
        this.spots = false;
        this.inventory = false;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
