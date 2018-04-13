import { Payment } from './payment';

export interface Document {
  id: string;
  oid: string;
  number: string;
  items: DocItem[];
  status: DocStatus;
}

export interface Payable extends Document {
    payments: Payment[];
}

export interface Order extends Document {

}

export interface Receipt extends Payable {

}

export interface Invoice extends Payable {

}

export interface DocItem {
  index: number;
}

export enum DocumentType {
  RECEIPT,
  INVOICE
}

export enum DocStatus {
  OPEN,
  CLOSED,
  CANCELED
}
