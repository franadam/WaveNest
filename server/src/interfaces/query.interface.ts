export type Order = 'ASC' | 'DESC';

export interface QueryInt {
  order: Order;
  sortBy: string;
  limit: string;
  skip: string;
}

export interface Shopping {
  model: string;
  brand: string;
  frets: number;
  wood: string;
  description: string;
  price: number[] | string[];
  available: number;
  itemSold: number;
  shipping: boolean;
  images: boolean;
}

export interface BodyInt {
  filters: Filter;
}

export interface Filter extends QueryInt, Shopping {}
