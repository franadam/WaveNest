import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private readonly sitesRepo: Repository<Site>,
  ) {}

  async create(createSiteDto: CreateSiteDto) {
    const site = await this.sitesRepo.create(createSiteDto);
    return this.sitesRepo.save(site);
  }

  async findAll() {
    const sites = await this.sitesRepo.find();
    if (!sites.length) throw new NotFoundException('site not found');
    return sites[0];
  }

  async findOne(id: number) {
    const site = await this.sitesRepo.findBy({ id });
    if (!site) throw new NotFoundException('site not found');
    return site;
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const site = await this.findOne(id);
    return this.sitesRepo.save({ ...site, ...updateSiteDto });
  }

  async remove(id: number) {
    const site = await this.findOne(id);
    return this.sitesRepo.remove(site);
  }
}
