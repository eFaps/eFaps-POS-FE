export enum PaymentType {
    CASH,
    FREE,
    CREDITCARD,
    DEBITCARD,
    CHANGE
}

export interface Payment {
    type: PaymentType;
    amount: number;
}
