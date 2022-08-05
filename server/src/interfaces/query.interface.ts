export type Order = 'ASC' | 'DESC';

export interface QueryInt {
  order: Order;
  sortBy: string;
  limit: string;
  skip: string;
  page: string;
}

export interface Shopping {
  model: string;
  brands: number[];
  frets: number[];
  // wood: string;
  // description: string;
  prices: number[];
  available: number;
  // itemSold: number;
  shipping: boolean;
  // images: boolean;
}

export interface BodyInt {
  filters: Shopping;
}

export interface Filter extends QueryInt, Shopping {}
