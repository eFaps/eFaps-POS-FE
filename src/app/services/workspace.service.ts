import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';

import { PosLayout, SpotConfig, Workspace } from '../model/index';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable()
export class WorkspaceService {
  SpotConfig = SpotConfig;
  private current: Workspace;
  private currentSource = new BehaviorSubject<Workspace>(this.current);
  currentWorkspace = this.currentSource.asObservable();

  constructor(private http: HttpClient, private auth: AuthService,
    private config: ConfigService, private localStorageService: LocalStorageService) { }

  public getWorkspaces(): Observable<Workspace[]> {
    const url = `${this.config.baseUrl}/workspaces`;
    return this.http.get<Workspace[]>(url);
  }

  public getWorkspace(_oid: string): Observable<Workspace> {
    const url = `${this.config.baseUrl}/workspaces/${_oid}`;
    return this.http.get<Workspace>(url);
  }

  public hasCurrent(): Promise<boolean> {
    if (this.currentSource.getValue()) {
      return new Promise<boolean>(resolve => resolve(true));
    }
    const workspacesStr = this.localStorageService.get('workspaces');
    if (workspacesStr) {
      const workspaceOid = JSON.parse(workspacesStr)[this.auth.getCurrentUsername()];
      if (workspaceOid) {
        return new Promise<boolean>(resolve => {
          this.getWorkspace(workspaceOid).subscribe(
            _ws => {
              this.setCurrent(_ws);
              resolve(true);
            },
            _error => {
              resolve(false);
            }
          );
        });
      }
    }
    return new Promise<boolean>(resolve => resolve(false));
  }

  public logout() {
    this.currentSource.next(null);
  }

  public setCurrent(_workspace: Workspace) {
    this.current = _workspace;
    this.currentSource.next(_workspace);
    this.storeCurrentWorkspace(_workspace.oid);
  }

  private storeCurrentWorkspace(_oid: string) {
    const workspacesStr = this.localStorageService.get('workspaces');
    let workspaces;
    if (workspacesStr) {
      workspaces = JSON.parse(workspacesStr);
    } else {
      workspaces = {};
    }
    workspaces[this.auth.getCurrentUsername()] = _oid;
    this.localStorageService.set('workspaces', JSON.stringify(workspaces));
  }

  public getLanguage() {
    return 'es';
  }

  public showSpots() {
    return this.current
        && this.current.spotConfig
        && this.current.spotConfig === SpotConfig.BASIC;
  }

  public getSpotSize(): number {
    return this.current
        && this.current.spotCount;
  }

  public showInventory() {
    return this.current
        && this.current.warehouseOid
        && this.current.warehouseOid.length > 0;
  }

  public getWarehouseOid(): string {
    return this.showInventory() && this.current.warehouseOid;
  }

  public getPosLayout(): PosLayout {
      return this.current && this.current.posLayout
        ? this.current.posLayout
        : PosLayout.GRID;
  }
}
