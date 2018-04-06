import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';


@Injectable()
export class WorkspaceService {

  private current: CurrentWorkspace;
  private currentSource = new BehaviorSubject<CurrentWorkspace>(this.current);
  currentWorkspace = this.currentSource.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getWorkspaces(): Observable<Workspace[]> {
    const url = `${this.config.baseUrl}/workspaces`;
    return this.http.get<Workspace[]>(url);
  }

  public hasCurrent(): boolean {
      if (this.currentSource.getValue()) {
          return true;
      }
      return false;
  }

  public setCurrent(_workspace: Workspace) {
      const ws = new CurrentWorkspace();
      ws.name = _workspace.name;
      this.currentSource.next(ws);
  }

}

export interface Workspace {
  oid: string;
  name: string;
}

export class CurrentWorkspace {
    name: string;
}
