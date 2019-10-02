import { Product } from '@efaps/pos-library';

export interface Item {
  product: Product;
  quantity: number;
  price: number;
  remark: string;
}
