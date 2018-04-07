import { Product } from './product';

export interface Item {
  product: Product,
  quantity: number;
  unitPrice: number;
  price: number;
}
