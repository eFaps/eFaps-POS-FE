import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Workspace } from '../model/index';

@Injectable()
export class WorkspaceService {

  private current: CurrentWorkspace;
  private currentSource = new BehaviorSubject<CurrentWorkspace>(this.current);
  currentWorkspace = this.currentSource.asObservable();

  constructor(private http: HttpClient, private auth: AuthService,
    private config: ConfigService) { }

  public getWorkspaces(): Observable<Workspace[]> {
    const url = `${this.config.baseUrl}/workspaces`;
    return this.http.get<Workspace[]>(url);
  }

  public getWorkspace(_oid: string): Observable<Workspace> {
    const url = `${this.config.baseUrl}/workspaces/${_oid}`;
    return this.http.get<Workspace>(url);
  }

  public hasCurrent(): boolean {
    if (this.currentSource.getValue()) {
      return true;
    }
    const workspacesStr = localStorage.getItem('workspaces');
    if (workspacesStr) {
      const workspaceOid = JSON.parse(workspacesStr)[this.auth.getCurrentUsername()];
      if (workspaceOid) {
        this.getWorkspace(workspaceOid).subscribe(_ws => this.setCurrent(_ws));
        return true;
      }
    }
    return false;
  }

  public logout() {
    this.currentSource.next(null);
  }

  public setCurrent(_workspace: Workspace) {
    const ws = new CurrentWorkspace();
    ws.name = _workspace.name;
    ws.posOid = _workspace.posOid;
    this.currentSource.next(ws);
    this.storeCurrentWorkspace(_workspace.oid);
  }

  private storeCurrentWorkspace(_oid: string) {
    const workspacesStr = localStorage.getItem('workspaces');
    let workspaces;
    if (workspacesStr) {
      workspaces = JSON.parse(workspacesStr);
    } else {
      workspaces = {};
    }
    workspaces[this.auth.getCurrentUsername()] = _oid;
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  }

  public getLanguage() {
      return 'es';
  }
}

export class CurrentWorkspace {
  name: string;
  posOid: string;
}
