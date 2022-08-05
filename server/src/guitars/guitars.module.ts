import { Module } from '@nestjs/common';
import { GuitarsService } from './guitars.service';
import { GuitarsController } from './guitars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guitar } from './entities/guitar.entity';
import { ImagesService } from 'src/images/images.service';
import { Brand } from 'src/brands/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guitar, Brand])],
  controllers: [GuitarsController],
  providers: [GuitarsService, ImagesService],
})
export class GuitarsModule {}
