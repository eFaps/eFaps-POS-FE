import { inject, Injector, Type } from "@angular/core";
import { CurrentCompany, CurrentUser, PersistenceService, PersistenceServiceProvider } from "@efaps/pos-library";
import { LocalStorageService } from "ngx-localstorage";


export class LocalStoragePersistence implements PersistenceService {
  private readonly storageService = inject(LocalStorageService);
  
  _workspaces = {
    save: () => {
      this.storageService.set("workspaces", this);
    },
  };

  _positions = {
    save: () => {
      this.storageService.set("positions", this);
    },
  };

  _currentCompany: CurrentCompany = {
    save: () => {
      this.storageService.set("currentCompany", this);
    },
    label: "",
    key: ""
  };

  _currentUser = {
    username: undefined,
    tokens: undefined,
    save: () => {
      this.storageService.set("currentUser", this);
    },
    clean() {},
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
    const ret = this._currentUser;
    ret.clean = () => {
      localStorage.removeItem("synerPOS_currentUser");
      ret.username = undefined;
      ret.tokens = undefined;
    };
    return ret;
  }
}

export class LocalPersistenceServiceProvider implements PersistenceServiceProvider {
  get() { 
    return new LocalStoragePersistence()
  };
}


export const PERSISTENCE = new LocalPersistenceServiceProvider();
