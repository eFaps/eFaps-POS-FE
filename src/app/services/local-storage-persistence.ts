import { inject, Injector, Type } from "@angular/core";
import { CurrentCompany, CurrentUser, PersistenceService, PersistenceServiceProvider } from "@efaps/pos-library";
import { LocalStorageService } from "ngx-localstorage";


export class LocalStoragePersistence implements PersistenceService {
  private readonly storageService = inject(LocalStorageService);
  
  private _workspaces = {
    save: () => {
      this.storageService.set("workspaces", this._workspaces);
    },
  };

  private _positions = {
    save: () => {
      this.storageService.set("positions", this._positions);
    },
  };

  private _currentCompany: CurrentCompany = {
    save: () => {
      this.storageService.set("currentCompany", this._currentCompany);
    },
    label: "",
    key: ""
  };

  private _currentUser : CurrentUser = {
    username: undefined,
    tokens: undefined,
    save: () => {
      this.storageService.set("currentUser", {
        username: this._currentUser.username,
        tokens: this._currentUser.tokens
      });
    },
    clean: () => {
       this.storageService.remove("currentUser")
       this._currentUser.username = undefined
       this._currentUser.tokens = undefined
    },
  };

  spotPositions() {
    return this._positions;
  }

  currentCompany() {
    return this._currentCompany;
  }

  workspaces() {
    return this._workspaces;
  }

  currentUser(): CurrentUser {
    return this._currentUser;;
  }
}

export class LocalPersistenceServiceProvider implements PersistenceServiceProvider {
  get() { 
    return new LocalStoragePersistence()
  };
}


export const PERSISTENCE = new LocalPersistenceServiceProvider();
