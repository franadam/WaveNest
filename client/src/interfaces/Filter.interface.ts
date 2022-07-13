export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Query {
  order: Order;
  sortBy: string;
  limit: number;
  skip: number;
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

export interface Filter extends Query, Shopping {}
