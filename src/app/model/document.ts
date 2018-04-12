export interface Document {
  id: string;
  oid: string;
  number: string;
  items: DocItem[];
  status: DocStatus;
}

export interface Order extends Document {

}

export interface Receipt extends Document {

}

export interface Invoice extends Document {

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
