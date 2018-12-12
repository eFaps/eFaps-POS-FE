import { remote } from "electron";

export class ElectronUtil {
  static close() {
    remote.getCurrentWindow().close();
  }
}
