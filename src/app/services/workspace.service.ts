import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';


@Injectable()
export class WorkspaceService {

  current: CurrentWorkspace;

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getWorkspaces(): Observable<Workspace[]> {
    const url = `${this.config.baseUrl}/workspaces`;
    return this.http.get<Workspace[]>(url);
  }

  public hasCurrent(): boolean {
      if (this.current) {
          return true;
      }
      return false;
  }

  public setCurrent(workspace: Workspace) {
      this.current = new CurrentWorkspace();
  }

}

export interface Workspace {
  oid: string;
  name: string;
}

export class CurrentWorkspace {

}
