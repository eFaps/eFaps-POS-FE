export enum PaymentType {
    CASH,
    FREE,
    CARD
}

export interface Payment {
    type: PaymentType;
    amount: number;
}
