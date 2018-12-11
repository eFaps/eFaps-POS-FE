export enum PaymentType {
  CASH,
  FREE,
  CREDITCARD,
  DEBITCARD,
  CHANGE,
  AUTO
}

export interface Payment {
  type: PaymentType;
  amount: number;
}
