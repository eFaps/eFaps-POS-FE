import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { WorkspaceService } from '../services/index';

@Injectable()
export class WorkspaceGuard implements CanActivate {

 constructor(private router: Router, private workspaceService: WorkspaceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean> (resolve => {
         this.workspaceService.hasCurrent().then(_ret => {
             if (_ret) {
                 resolve(true);
              } else {
                  this.router.navigate(['/workspaces']);
                  resolve(false);
              }
          });
      });
  }
}
