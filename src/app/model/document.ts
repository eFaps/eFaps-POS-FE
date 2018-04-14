import { Payment } from './payment';
import { Product } from './product';

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
  product: Product;
  quantity: number;
  netPrice: number;
  netUnitPrice: number;
  crossPrice: number;
  crossUnitPrice: number;
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
