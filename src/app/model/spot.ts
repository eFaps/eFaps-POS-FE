import { Order } from './document';

export interface Spot {
  id: string;
  label: string;
  order?: Order;
}
