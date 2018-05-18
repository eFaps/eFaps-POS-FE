export enum PaymentType {
    CASH,
    FREE,
    CREDITCARD,
    DEBITCARD
}

export interface Payment {
    type: PaymentType;
    amount: number;
}
