import { Brand } from './Brands.interface';
import { Picture } from './Pictures.interface';

export interface ServerGuitar {
  model: string;
  frets: number;
  wood: string;
  description: string;
  price: number;
  available: number;
  shipping: boolean;
  created_at: string;
  updated_at: string;
}

export interface Guitar extends ServerGuitar {
  id: number;
  brand: Brand;
  description: string;
  price: number;
  available: number;
  itemSold: number;
  images: Picture[];
}
