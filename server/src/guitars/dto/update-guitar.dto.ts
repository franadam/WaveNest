import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, Max } from 'class-validator';
import { Brand } from '../../brands/entities/brand.entity';
import { CreateGuitarDto } from './create-guitar.dto';

export class UpdateGuitarDto extends PartialType(CreateGuitarDto) {
  @IsString()
  model: string;

  @IsNumber()
  frets: number;

  @IsNumber()
  brand: Brand;

  @IsString()
  wood: string;

  @IsString()
  description: string;

  @IsNumber()
  @Max(50)
  available: number;

  @IsNumber()
  @Max(5550)
  price: number;
}
