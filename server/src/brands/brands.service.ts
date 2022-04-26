import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryInt } from 'src/interfaces/query.interface';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  create(createBrandDto: CreateBrandDto) {
    const brand = this.brandRepo.create(createBrandDto);
    return this.brandRepo.save(brand);
  }

  async findAll(query: QueryInt) {
    const order = query.order ? query.order.toUpperCase() : 'ASC';
    const sortBy = query.sortBy ? query.sortBy : 'id';
    const take = query.limit ? parseInt(query.limit) : 10;
    const skip = query.skip ? parseInt(query.skip) : 0;
    const brands = await this.brandRepo.find({
      order: { [sortBy]: order },
      skip,
      take,
    });
    return brands;
  }

  findOne(id: number) {
    return this.brandRepo.findOneBy({ id });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) throw new NotFoundException('brand not found');
    const updated = { ...brand, ...updateBrandDto };
    return this.brandRepo.save(updated);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) throw new NotFoundException('brand not found');
    return this.brandRepo.remove(brand);
  }
}
