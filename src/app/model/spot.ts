import { Order } from './document';

export enum SpotConfig {
    NONE,
    BASIC,
}

export interface Spot {
  id: string;
  label: string;
  order?: Order;
}
