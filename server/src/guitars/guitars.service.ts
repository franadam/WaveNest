import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findAll() {
    return this.guitarRepo.find();
  }

  findOne(id: number) {
    return this.guitarRepo.findOneBy({ id });
  }

  update(id: number, updateGuitarDto: UpdateGuitarDto) {
    return `This action updates a #${id} guitar`;
  }

  remove(id: number) {
    return `This action removes a #${id} guitar`;
  }
}
