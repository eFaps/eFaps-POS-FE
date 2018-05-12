import { Payment } from './payment';
import { Product } from './product';
import { TaxEntry } from './tax';

export interface Document {
  type?: 'ORDER' | 'RECEIPT' | 'INVOICE';
  id: string;
  oid: string;
  number: string;
  currency: string;
  items: DocItem[];
  status: DocStatus;
  netTotal: number;
  crossTotal: number;
  taxes: TaxEntry[];
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
