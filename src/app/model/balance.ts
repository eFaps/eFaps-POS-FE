import { User } from '@efaps/pos-library';

export interface Balance {
  id: string;
  oid: string;
  number: string;
  startAt: Date;
  endAt: Date;
  status: 'OPEN' | 'CLOSED';
  user?: User;
}
