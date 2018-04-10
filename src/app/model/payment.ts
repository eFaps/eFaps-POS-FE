export enum PaymentType {
    CASH,
    FREE
}

export interface Payment {
    type: PaymentType;
    amount: number;
}
