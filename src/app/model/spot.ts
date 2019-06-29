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
  position?: Position;
}

export interface SpotsLayout {
  floors: Floor[];
}

export interface Floor {
  label: string;
  spots: Spot[];
}

export interface Position {
  x: number;
  y: number;
}
