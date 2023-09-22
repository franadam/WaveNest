import { QueryInt } from 'src/interfaces/Query.interface';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
export declare class BrandsService {
    private brandRepo;
    constructor(brandRepo: Repository<Brand>);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(query: QueryInt): Promise<Brand[]>;
    findOne(id: number): Promise<Brand>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
    } & Brand>;
    remove(id: number): Promise<Brand>;
}
