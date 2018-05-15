import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators';

import { Workspace } from '../model/index';
import { Pos } from '../model/index';
import { PosService, WorkspaceService } from '../services/index';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  workspaces: Workspace[] = [];
  poss: Pos[] = [];

  constructor(private router: Router, private workspaceService: WorkspaceService,
    private posService: PosService) { }

  ngOnInit() {
    this.workspaceService.getWorkspaces()
      .subscribe(data => { this.workspaces = data; });
    this.posService.getPoss()
      .subscribe(data => { this.poss = data; });
  }

  select(_workspace: Workspace) {
    this.workspaceService.setCurrent(_workspace);
    this.router.navigate(['/pos']);
  }

  getPosName(_workspace: Workspace): string {
    const ret = this.poss.find(pos => pos.oid === _workspace.posOid);
    return ret ? ret.name : '';
  }
}
