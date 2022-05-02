export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Filter {
  order: Order;
  sortBy: string;
  limit: number;
  skip: number;
  price?: number[] | string[];
}
