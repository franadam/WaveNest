import { Guitar } from './Guitars.interface';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Sort {
  order: Order;
  key: keyof Guitar;
}

export interface Query {
  order: Order;
  sortBy: string;
  limit: number;
  page: number;
}

export type Column = {
  label: string;
  filter: keyof Guitar;
};

export interface PageProps {
  activePage: number;
  rowsPerPage: number;
  filteredRows: Guitar[];
  calculatedRows: Guitar[];
  count: number;
  totalPages: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

export interface Page {
  activePage: number;
  totalPages: number;
  count: number;
  limit: number;
  sort: Sort;
  calculatedRows: Guitar[];
}

export interface Shopping {
  model?: string;
  brands: number[];
  frets: number[];
  // wood: string[];
  prices: number[];
  available?: number;
  shipping: boolean;
  // images: boolean;
}

export interface Filter extends Query, Shopping {}
