import { inject, Injector, Type } from "@angular/core";
import {
  CurrentCompany,
  CurrentUser,
  PersistenceService,
  PersistenceServiceProvider,
} from "@efaps/pos-library";
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
      this.storageService.set("spotPositions", this._positions);
    },
  };

  private _currentCompany: CurrentCompany = {
    save: () => {
      this.storageService.set("currentCompany", this._currentCompany);
    },
    label: "",
    key: "",
  };

  private _currentUser: CurrentUser = {
    username: undefined,
    tokens: undefined,
    save: () => {
      this.storageService.set("currentUser", {
        username: this._currentUser.username,
        tokens: this._currentUser.tokens,
      });
    },
    clean: () => {
      this.storageService.remove("currentUser");
      this._currentUser.username = undefined;
      this._currentUser.tokens = undefined;
    },
  };

  spotPositions() {
    const sp = this.storageService.get("spotPositions");
    if (sp != null) {
      Object.assign(this._positions, sp);
    }
    return this._positions;
  }

  currentCompany() {
    const cc = this.storageService.get("currentCompany");
    if (cc != null) {
      Object.assign(this._currentCompany, cc);
    }
    return this._currentCompany;
  }

  workspaces() {
    const ws = this.storageService.get("workspaces");
    if (ws != null) {
      Object.assign(this._workspaces, ws);
    }
    return this._workspaces;
  }

  currentUser(): CurrentUser {
    const cu = this.storageService.get("currentUser");
    if (cu != null) {
       Object.assign(this._currentUser, cu);
    }
    return this._currentUser;
  }
}

export class LocalPersistenceServiceProvider implements PersistenceServiceProvider {
  get() {
    return new LocalStoragePersistence();
  }
}

export const PERSISTENCE = new LocalPersistenceServiceProvider();
