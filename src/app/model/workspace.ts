import { DocumentType } from './document';
import { SpotConfig } from './spot';
import { Discount } from './discount';

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
  discounts: Discount[];
  cards: Card[];
}

export interface PrintCmd {
  printerOid: string;
  target: 'JOB' | 'PRELIMINARY' | 'TICKET' | 'COPY';
  targetOid: string;
}

export interface Card {
  label: string;
  cardTypeId: number;
}

export enum PosLayout {
  GRID = 'GRID',
  LIST = 'LIST',
  BOTH = 'BOTH',
}
