import { Brand } from './Brands.interface';

export interface Guitar {
  id: number;
  model: string;
  frets: number;
  wood: string;
  brand: Brand;
  description: string;
  price: number;
  available: number;
  itemSold: number;
  shipping: boolean;
  images: string[];
  created_at: string;
  updated_at: string;
}
