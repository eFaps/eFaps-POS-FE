import { LocalStorage } from "@efaps/ngx-store";
import { CurrentUser, PersistenceService } from "@efaps/pos-library";

export class LocalStoragePersistence implements PersistenceService {
  @LocalStorage("workspaces") _workspaces = {
    save() {},
  };

  @LocalStorage("positions") _positions = {
    save() {},
  };

  @LocalStorage("currentCompany") _currentCompany = {
    save() {},
  };

  @LocalStorage("currentUser") _currentUser = {
    username: undefined,
    tokens: undefined,
    save() {},
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
export const PERSISTENCE = new LocalStoragePersistence();
