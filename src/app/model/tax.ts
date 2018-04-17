export interface Tax {
    name: string;
    percent: number;
}

export interface TaxEntry {
    tax: Tax;
    amount: number;
}
