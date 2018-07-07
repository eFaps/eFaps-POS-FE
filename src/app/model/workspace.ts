import { DocumentType } from './document';
import { SpotConfig } from './spot';

export interface Workspace {
  oid: string;
  name: string;
  posOid: string;
  docTypes: DocumentType[];
  spotConfig: SpotConfig;
  spotCount: number;
  warehouseOid: string;
  printCmds: PrintCmd[];
  posLayout: PosLayout;
}

export interface PrintCmd {
  printerOid: string;
  target: 'JOB';
  targetOid: string;
}

export enum PosLayout {
    GRID = 'GRID',
    LIST = 'LIST',
    BOTH = 'BOTH',
}
