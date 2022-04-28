import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { BodyInt, Order, QueryInt } from 'src/interfaces/query.interface';
import { Between, Repository } from 'typeorm';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { Guitar } from './entities/guitar.entity';

@Injectable()
export class GuitarsService {
  constructor(
    @InjectRepository(Guitar) private readonly guitarRepo: Repository<Guitar>,
  ) {}

  create(createGuitarDto: CreateGuitarDto) {
    const guitar = this.guitarRepo.create(createGuitarDto);
    return this.guitarRepo.save(guitar);
  }

  findAll(query: QueryInt) {
    const order = query.order ? query.order.toUpperCase() : 'ASC';
    const sortBy = query.sortBy ? query.sortBy : 'id';
    const take = query.limit ? parseInt(query.limit) : 10;
    const skip = query.skip ? parseInt(query.skip) : 0;

    return this.guitarRepo.find({
      order: { [sortBy]: order },
      skip,
      take,
      relations: {
        brand: true,
      },
    });
  }

  findOne(id: number) {
    return this.guitarRepo.findOneBy({ id });
  }

  async update(id: number, updateGuitarDto: UpdateGuitarDto) {
    const guitar = await this.findOne(id);
    if (!guitar) throw new NotFoundException('guitar not found');
    return this.guitarRepo.save({ ...guitar, ...updateGuitarDto });
  }

  async remove(id: number) {
    const guitar = await this.findOne(id);
    if (!guitar) throw new NotFoundException('guitar not found');
    return this.guitarRepo.remove(guitar);
  }

  async shopping(filters: QueryInt) {
    const order = filters.order ? filters.order.toUpperCase() : 'DESC';
    const sortBy = filters.sortBy ? filters.sortBy : 'model';
    const limit = filters.limit ? parseInt(filters.limit) : 10;
    const skip = filters.skip ? parseInt(filters.skip) : 0;

    const guitars = await this.guitarRepo
      .createQueryBuilder('guitars')
      .leftJoinAndSelect('guitars.brand', 'brand')
      .where('guitars.price BETWEEN  :minprice AND :maxprice', {
        minprice: filters.price[0],
        maxprice: filters.price[1],
      })
      .limit(limit)
      .offset(skip)
      .orderBy(sortBy, order as Order)
      .getMany();

    return guitars;
  }
}
