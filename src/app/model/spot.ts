import { Order } from './document';

export enum SpotConfig {
  NONE = 'NONE',
  BASIC = 'BASIC',
  EXTENDED = 'EXTENDED',
}

export interface Spot {
  id: string;
  label: string;
  order?: Order;
}

export interface SpotsLayout {
  floors: Floor[];
}

export interface Floor {
  label: string;
  spots: Spot[];
}
