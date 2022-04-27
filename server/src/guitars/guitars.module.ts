import { Module } from '@nestjs/common';
import { GuitarsService } from './guitars.service';
import { GuitarsController } from './guitars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guitar } from './entities/guitar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guitar])],
  controllers: [GuitarsController],
  providers: [GuitarsService],
})
export class GuitarsModule {}
