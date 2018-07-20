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
  relations: ProductRelation[];
}

export interface ProductRelation {
  label: string;
  productOid: string;
}

export interface RelationEntry {
  label: string;
  product: Product;
}
