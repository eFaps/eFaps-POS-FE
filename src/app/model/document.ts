import { Payment } from './payment';
import { Product } from './product';
import { TaxEntry } from './tax';
import { Spot } from './spot';

export interface Document {
  type?: 'ORDER' | 'RECEIPT' | 'INVOICE' | 'TICKET';
  id: string;
  oid: string;
  number: string;
  currency: string;
  items: DocItem[];
  status: DocStatus;
  netTotal: number;
  crossTotal: number;
  taxes: TaxEntry[];
  contactOid?: string;
  workspaceOid?: string;
}

export interface Payable extends Document {
  payments: Payment[];
}

export interface Order extends Document {
  spot?: Spot;
}
/* tslint:disable-next-line */
export interface Receipt extends Payable {

}
/* tslint:disable-next-line */
export interface Invoice extends Payable {

}
/* tslint:disable-next-line */
export interface Ticket extends Payable {

}

export interface DocItem {
  index: number;
  product: Product;
  quantity: number;
  netPrice: number;
  netUnitPrice: number;
  crossPrice: number;
  crossUnitPrice: number;
  taxes: TaxEntry[];
}


export enum DocumentType {
  RECEIPT,
  INVOICE,
  TICKET
}

export enum DocStatus {
  OPEN,
  CLOSED,
  CANCELED
}
