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
  discounts: Discount[]
}

export interface PrintCmd {
  printerOid: string;
  target: 'JOB' | 'PRELIMINARY' | 'TICKET';
  targetOid: string;
}

export enum PosLayout {
  GRID = 'GRID',
  LIST = 'LIST',
  BOTH = 'BOTH',
}

export interface Discount {
  type: DiscountType,
  value: number,
  productOid: string,
  label: string
}

export enum DiscountType {
  PERCENT = 'PERCENT',
  AMOUNT = 'AMOUNT'
}
