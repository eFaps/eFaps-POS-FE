import { Tax } from './tax';

export interface Product {
    oid: string;
    sku: string;
    description: string;
    imageOid: string;
    netPrice: number;
    crossPrice: number;
    categoryOids: string[];
    taxes: Tax[];
}
