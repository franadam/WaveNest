import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { Order, Filter, QueryInt } from 'src/interfaces/Query.interface';
import { Between, Repository } from 'typeorm';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { Guitar } from './entities/guitar.entity';

@Injectable()
export class GuitarsService {
  constructor(
    @InjectRepository(Guitar) private readonly guitarRepo: Repository<Guitar>,
  ) {}

  async create(createGuitarDto: CreateGuitarDto) {
    console.log('service guitar>> createGuitarDto', createGuitarDto);
    const guitar = this.guitarRepo.create(createGuitarDto);
    console.log('service guitar>>', guitar);
    const saved = await this.guitarRepo.save(guitar);
    console.log('service guitar>> saved', saved);
    return saved;
  }

  // {
  //     "model" : "CB040",
  //     "description" : "Beta Super",
  //     "price" : 2000,
  //     "brand" : 1,
  //     "shipping" : true,
  //     "available" : 15,
  //     "wood" : "5b2c1c88255983b4795f8fdb",
  //     "frets" : 22,
  //     "publish" : true
  // }
  findAll(query: QueryInt) {
    const order = query.order ? query.order.toUpperCase() : 'ASC';
    const sortBy = query.sortBy ? query.sortBy : 'id';
    const take = query.limit ? parseInt(query.limit) : 100;
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

  async findOne(id: number) {
    const guitar = await this.guitarRepo.findOne({
      where: { id },
      relations: {
        brand: true,
      },
    });
    console.log('service >> guitar', guitar);
    return guitar;
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

  async shopping(filters: Filter) {
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

    const filteredGuitars = guitars.filter((guitar) => {
      let isValid = true;
      for (const key in filters) {
        console.log(key, guitar[key], filters[key]);
        isValid = isValid && guitar[key] === filters[key];
      }
      return isValid;
    });

    return filteredGuitars;
  }
}
