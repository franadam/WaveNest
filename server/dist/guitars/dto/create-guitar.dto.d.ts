import { Brand } from '../../brands/entities/brand.entity';
export declare class CreateGuitarDto {
    model: string;
    frets: number;
    brand: Brand;
    wood: string;
    description: string;
    available: number;
    price: number;
}
