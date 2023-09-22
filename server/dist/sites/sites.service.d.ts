import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
export declare class SitesService {
    private readonly sitesRepo;
    constructor(sitesRepo: Repository<Site>);
    create(createSiteDto: CreateSiteDto): Promise<Site>;
    findAll(): Promise<Site>;
    findOne(id: number): Promise<Site[]>;
    update(id: number, updateSiteDto: UpdateSiteDto): Promise<{
        address: string;
        hours: string;
        phone: string;
        email: string;
        id: number;
    } & Site>;
    remove(id: number): Promise<Site[]>;
}
