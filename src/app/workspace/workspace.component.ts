import { Component, OnInit } from '@angular/core';
import { Workspace, WorkspaceService } from '../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

    workspaces: Workspace[] = [];

    constructor(private router: Router, private workspaceService: WorkspaceService) { }

    ngOnInit() {
        this.workspaceService.getWorkspaces()
          .subscribe(data => this.workspaces = data);
    }

    select(_workspace: Workspace) {
        this.workspaceService.setCurrent(_workspace);
        this.router.navigate(['/pos']);
    }

}
