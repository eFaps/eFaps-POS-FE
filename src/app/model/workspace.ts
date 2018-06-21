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
}

export interface PrintCmd {
  printerOid: string;
  target: 'JOB';
  targetOid: string;
}
