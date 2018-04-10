import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { WorkspaceService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  screenWidth: number;
  workspace: string;
  constructor(public translate: TranslateService, private workspaceService: WorkspaceService) {
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
      } else {
        this.workspace = '';
      }
    });
  }
}
