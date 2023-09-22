import { Brand } from '../../brands/entities/brand.entity';
import { CreateGuitarDto } from './create-guitar.dto';
declare const UpdateGuitarDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGuitarDto>>;
export declare class UpdateGuitarDto extends UpdateGuitarDto_base {
    model: string;
    frets: number;
    brand: Brand;
    wood: string;
    description: string;
    available: number;
    price: number;
}
export {};
