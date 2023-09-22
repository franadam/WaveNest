/// <reference types="multer" />
import { GuitarsService } from './guitars.service';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { QueryInt, Shopping } from 'src/interfaces/Query.interface';
import { ImagesService } from 'src/images/images.service';
export declare class GuitarsController {
    private readonly guitarsService;
    private readonly imagesService;
    constructor(guitarsService: GuitarsService, imagesService: ImagesService);
    create(createGuitarDto: CreateGuitarDto): Promise<import("./entities/guitar.entity").Guitar>;
    findAll(query: any): Promise<import("./entities/guitar.entity").Guitar[]>;
    getPagination(query: QueryInt): Promise<{
        order: string;
        sortBy: string;
        limit: number;
        current: number;
        skip: number;
        total: number;
    }>;
    shopping(filters: Shopping): Promise<import("./entities/guitar.entity").Guitar[]>;
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        url: string;
    }>;
    findOne(id: string): Promise<import("./entities/guitar.entity").Guitar>;
    update(id: string, updateGuitarDto: UpdateGuitarDto): Promise<{
        model: string;
        frets: number;
        brand: import("../brands/entities/brand.entity").Brand;
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
    } & import("./entities/guitar.entity").Guitar>;
    remove(id: string, req: Request): Promise<import("./entities/guitar.entity").Guitar>;
}
