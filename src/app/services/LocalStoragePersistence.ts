import { PersistenceService } from "@efaps/pos-library";
import { LocalStorage } from "@efaps/ngx-store";

export class LocalStoragePersistence implements PersistenceService {
  @LocalStorage("workspaces") _workspaces = {
    save() { },
  };

  @LocalStorage("positions") _positions = {
    save() { },
  };

  @LocalStorage("currentCompany") _currentCompany = {
    save() { },
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
}
export const PERSISTENCE = new LocalStoragePersistence();
