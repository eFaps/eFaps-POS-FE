export interface Balance {
  id: string;
  oid: string;
  number: string;
  start: Date;
  end: Date;
  status: 'OPEN' | 'CLOSED';
}
