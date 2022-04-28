export type Order = 'ASC' | 'DESC';

export interface QueryInt {
  order: Order;
  sortBy: string;
  limit: string;
  skip: string;
  price?: number[] | string[];
}

export interface BodyInt {
  filters: QueryInt;
}
