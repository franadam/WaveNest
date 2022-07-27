import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, Filter, QueryInt } from 'src/interfaces/Query.interface';
import { Repository } from 'typeorm';
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

  async findAll() {
    return this.guitarRepo.find({
      relations: {
        brand: true,
      },
    });
  }

  async findAllWithParams(query: QueryInt) {
    // const order = query.order ? query.order.toUpperCase() : 'ASC';
    // const sortBy = query.sortBy ? query.sortBy : 'id';
    // const take = query.limit ? parseInt(query.limit) : 100;
    // const page = query.page ? parseInt(query.page) : 1;
    // const skip = (page - 1) * take; // query.skip ? parseInt(query.skip) : 0;

    const {
      order,
      sortBy,
      skip,
      limit: take,
      total,
      current,
    } = await this.getPagination(query);

    const guitars = await this.guitarRepo.find({
      order: { [sortBy]: order },
      skip,
      take,
      relations: {
        brand: true,
      },
    });
    return guitars; //{guitars, count:total, currentPage:current}
  }

  async findOne(id: number) {
    const guitar = await this.guitarRepo.findOne({
      where: { id },
      relations: {
        brand: true,
      },
    });
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

  async countDocuments() {
    const guitars = await this.guitarRepo.find();
    return guitars.length;
  }

  async getPagination(query: QueryInt) {
    const order = query.order ? query.order.toUpperCase() : 'ASC';
    const sortBy = query.sortBy ? query.sortBy : 'id';
    const limit = query.limit ? parseInt(query.limit) : 10;
    const current = query.page ? parseInt(query.page) : 1;
    const skip = (current - 1) * limit; // query.skip ? parseInt(query.skip) : 0;
    const count = await this.countDocuments();
    const total = Math.ceil(count / limit);
    const pagination = { order, sortBy, limit, current, skip, total };
    console.log('pagination', pagination);
    return pagination;
  }

  async shopping(filters: Filter) {
    // const order = filters.order ? filters.order.toUpperCase() : 'DESC';
    // const sortBy = filters.sortBy ? filters.sortBy : 'model';
    // const limit = filters.limit ? parseInt(filters.limit) : 10;
    // const skip = filters.skip ? parseInt(filters.skip) : 0;

    const { order, sortBy, skip, limit, total, current } =
      await this.getPagination(filters);

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
