import { Brand } from 'src/brands/entities/brand.entity';
import { QueryInt, Shopping } from 'src/interfaces/Query.interface';
import { Repository } from 'typeorm';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { Guitar } from './entities/guitar.entity';
export declare class GuitarsService {
    private readonly guitarRepo;
    constructor(guitarRepo: Repository<Guitar>);
    create(createGuitarDto: CreateGuitarDto): Promise<Guitar>;
    findAll(): Promise<Guitar[]>;
    findAllWithParams(query: QueryInt): Promise<Guitar[]>;
    findOne(id: number): Promise<Guitar>;
    update(id: number, updateGuitarDto: UpdateGuitarDto): Promise<{
        model: string;
        frets: number;
        brand: Brand;
        wood: string;
        description: string;
        available: number;
        price: number;
        id: number;
        itemSold: number;
        shipping: boolean;
        images: import("../interfaces/Pictures.interface").Picture[];
        created_at: Date;
        updated_at: Date;
    } & Guitar>;
    remove(id: number): Promise<Guitar>;
    countDocuments(): Promise<number>;
    getPagination(query: QueryInt): Promise<{
        order: string;
        sortBy: string;
        limit: number;
        current: number;
        skip: number;
        total: number;
    }>;
    shopping(filters: Shopping): Promise<Guitar[]>;
}
