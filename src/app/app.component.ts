import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private cdRef: ChangeDetectorRef, public translate: TranslateService,
    private workspaceService: WorkspaceService,
    public auth: AuthService) {
    translate.use(workspaceService.getLanguage());
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe(data => {
      if (data) {
        this.workspace = data.name;
        this.spots = this.workspaceService.showSpots();
      } else {
        this.workspace = '';
        this.spots = false;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
