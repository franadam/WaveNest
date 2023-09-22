import { Brand } from 'src/brands/entities/brand.entity';
import { Picture } from 'src/interfaces/Pictures.interface';
export declare class Guitar {
    id: number;
    model: string;
    brand: Brand;
    frets: number;
    wood: string;
    description: string;
    price: number;
    available: number;
    itemSold: number;
    shipping: boolean;
    images: Picture[];
    created_at: Date;
    updated_at: Date;
}
