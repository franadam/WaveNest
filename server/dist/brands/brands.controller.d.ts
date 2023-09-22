import { QueryInt } from 'src/interfaces/Query.interface';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    create(createBrandDto: CreateBrandDto, userRole: any): Promise<import("./entities/brand.entity").Brand>;
    findAll(query: QueryInt): Promise<import("./entities/brand.entity").Brand[]>;
    findOne(id: string): Promise<import("./entities/brand.entity").Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
    } & import("./entities/brand.entity").Brand>;
    remove(id: string): Promise<import("./entities/brand.entity").Brand>;
}
