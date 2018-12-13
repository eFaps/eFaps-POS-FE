import { remote } from "electron";

export class ElectronUtil {
  static close() {
    remote.app.quit();
  }
}
